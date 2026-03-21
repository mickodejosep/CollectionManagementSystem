import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CollectionService } from "../../core/services/collection.service";
import { CollectionRecord } from "../../core/models/collection.model";
import { EmptyStateComponent } from "../../shared/empty-state/empty-state.component";

@Component({
  standalone: true,
  selector: "app-collections",
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, EmptyStateComponent],
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly collectionService = inject(CollectionService);

  readonly collections = this.collectionService.collections;
  readonly editingId = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly submitLabel = computed(() =>
    this.editingId() ? "Update Collection" : "Add Collection",
  );

  readonly collectionForm = this.fb.nonNullable.group({
    collectorName: ["", [Validators.required, Validators.minLength(2)]],
    amount: [0, [Validators.required, Validators.min(1)]],
    collectionDate: [
      new Date().toISOString().slice(0, 10),
      Validators.required,
    ],
    remarks: ["", [Validators.required, Validators.minLength(3)]],
  });

  async submit(): Promise<void> {
    if (this.collectionForm.invalid) {
      this.collectionForm.markAllAsTouched();
      return;
    }

    const formValue = this.collectionForm.getRawValue();
    const payload = { ...formValue, amount: Number(formValue.amount) };

    if (this.editingId()) {
      await this.collectionService.updateCollection(this.editingId()!, payload);
      this.showSuccess("Collection updated successfully.");
    } else {
      await this.collectionService.addCollection(payload);
      this.showSuccess("Collection added successfully.");
    }

    this.cancelEdit();
  }

  startEdit(record: CollectionRecord): void {
    this.editingId.set(record.id);
    this.collectionForm.patchValue({
      collectorName: record.collectorName,
      amount: record.amount,
      collectionDate: record.collectionDate,
      remarks: record.remarks,
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.collectionForm.reset({
      collectorName: "",
      amount: 0,
      collectionDate: new Date().toISOString().slice(0, 10),
      remarks: "",
    });
  }

  async delete(record: CollectionRecord): Promise<void> {
    const confirmed = window.confirm(
      `Delete collection from ${record.collectorName}?`,
    );
    if (!confirmed) {
      return;
    }

    await this.collectionService.deleteCollection(record.id);
    this.showSuccess("Collection deleted successfully.");
  }

  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(null), 2500);
  }
}
