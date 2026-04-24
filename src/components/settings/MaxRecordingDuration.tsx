import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { MaxRecordingDuration } from "@/bindings";

interface MaxRecordingDurationProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const MaxRecordingDurationSelector: React.FC<MaxRecordingDurationProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const selectedDuration =
      (getSetting("max_recording_duration") as string) ?? "min5";

    const handleSelect = async (value: string) => {
      await updateSetting(
        "max_recording_duration",
        value as MaxRecordingDuration,
      );
    };

    const options = [
      { value: "min1", label: t("settings.debug.maxRecordingDuration.min1") },
      { value: "min2", label: t("settings.debug.maxRecordingDuration.min2") },
      { value: "min5", label: t("settings.debug.maxRecordingDuration.min5") },
      { value: "min10", label: t("settings.debug.maxRecordingDuration.min10") },
      { value: "min30", label: t("settings.debug.maxRecordingDuration.min30") },
      { value: "unlimited", label: t("settings.debug.maxRecordingDuration.unlimited") },
    ];

    return (
      <SettingContainer
        title={t("settings.debug.maxRecordingDuration.title")}
        description={t("settings.debug.maxRecordingDuration.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Dropdown
          options={options}
          selectedValue={selectedDuration}
          onSelect={handleSelect}
          placeholder={t("settings.debug.maxRecordingDuration.title")}
          disabled={isUpdating("max_recording_duration")}
        />
      </SettingContainer>
    );
  });

MaxRecordingDurationSelector.displayName = "MaxRecordingDurationSelector";
