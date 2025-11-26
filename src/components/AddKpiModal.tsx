import { useState } from "react";
import type { FormEvent } from "react";
import type { Kpi, KpiValue, Pillar, FunctionKey, Unit } from "../types";
import { generateKpiValues } from "../mockData";
import "./AddKpiModal.css";

interface AddKpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (kpi: Kpi, values: KpiValue[]) => void;
  existingIds: string[];
  availablePillars: Pillar[];
}

export const AddKpiModal = ({
  isOpen,
  onClose,
  onAdd,
  existingIds,
  availablePillars,
}: AddKpiModalProps) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    pillar: "" as Pillar | "",
    function: "" as FunctionKey | "",
    unit: "" as Unit | "",
    target: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = "KPI ID is required";
    } else if (existingIds.includes(formData.id.trim())) {
      newErrors.id = "KPI ID already exists";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.pillar) {
      newErrors.pillar = "Pillar is required";
    }

    if (!formData.function) {
      newErrors.function = "Function is required";
    }

    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }

    if (formData.target && isNaN(Number(formData.target))) {
      newErrors.target = "Target must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newKpi: Kpi = {
      id: formData.id.trim(),
      name: formData.name.trim(),
      pillar: formData.pillar as Pillar,
      type: "Primary", // Default to Primary
      function: formData.function as FunctionKey,
      unit: formData.unit as Unit,
    };

    // Generate dummy values with the target
    const target = formData.target ? Number(formData.target) : 50;
    const tempKpis = [newKpi];
    const customTargets = { [newKpi.id]: target };
    const newValues = generateKpiValues(tempKpis, customTargets);

    onAdd(newKpi, newValues);

    // Reset form
    setFormData({
      id: "",
      name: "",
      pillar: "" as Pillar | "",
      function: "" as FunctionKey | "",
      unit: "" as Unit | "",
      target: "",
    });
    setErrors({});
    onClose();
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New KPI</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="kpi-id">
              KPI ID <span className="required">*</span>
            </label>
            <input
              id="kpi-id"
              type="text"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              placeholder="e.g., TF_P3"
              className={errors.id ? "error" : ""}
            />
            {errors.id && <span className="error-message">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kpi-name">
              Name <span className="required">*</span>
            </label>
            <input
              id="kpi-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., % of early-talent hires"
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kpi-pillar">
              Pillar <span className="required">*</span>
            </label>
            <select
              id="kpi-pillar"
              value={formData.pillar}
              onChange={(e) => handleChange("pillar", e.target.value)}
              className={errors.pillar ? "error" : ""}
            >
              <option value="">Select a pillar</option>
              {availablePillars.map((pillar) => (
                <option key={pillar} value={pillar}>
                  {pillar}
                </option>
              ))}
            </select>
            {errors.pillar && <span className="error-message">{errors.pillar}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kpi-function">
              Function <span className="required">*</span>
            </label>
            <select
              id="kpi-function"
              value={formData.function}
              onChange={(e) => handleChange("function", e.target.value)}
              className={errors.function ? "error" : ""}
            >
              <option value="">Select a function</option>
              <option value="BA">BA</option>
              <option value="DS">DS</option>
              <option value="AE">AE</option>
              <option value="Cross">Cross</option>
            </select>
            {errors.function && (
              <span className="error-message">{errors.function}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="kpi-unit">
              Unit <span className="required">*</span>
            </label>
            <select
              id="kpi-unit"
              value={formData.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              className={errors.unit ? "error" : ""}
            >
              <option value="">Select a unit</option>
              <option value="percent">Percent (%)</option>
              <option value="index">Index</option>
              <option value="count">Count</option>
              <option value="days">Days</option>
            </select>
            {errors.unit && <span className="error-message">{errors.unit}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kpi-target">Target (Optional)</label>
            <input
              id="kpi-target"
              type="number"
              value={formData.target}
              onChange={(e) => handleChange("target", e.target.value)}
              placeholder="e.g., 50"
              className={errors.target ? "error" : ""}
            />
            {errors.target && (
              <span className="error-message">{errors.target}</span>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add KPI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

