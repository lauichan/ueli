import { useContextBridge, useSetting } from "@Core/Hooks";
import { isValidHotkey } from "@common/Core/Hotkey";
import { Button, Field, Input, Toaster, Tooltip, useId } from "@fluentui/react-components";
import { InfoRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const HotKey = () => {
    const { t } = useTranslation();
    const ns = "settingsGeneral";

    const hotkeyToasterId = useId("hotkeyToasterId");

    const { contextBridge } = useContextBridge();

    const { value: hotkey, updateValue: setHotkey } = useSetting({ key: "general.hotkey", defaultValue: "Alt+Space" });

    const [temporaryHotkey, setTemporaryHotkey] = useState<string>(hotkey);

    return (
        <Field
            label={t("hotkey", { ns })}
            validationMessage={isValidHotkey(temporaryHotkey) ? t("validHotkey", { ns }) : t("invalidHotkey", { ns })}
            validationState={isValidHotkey(temporaryHotkey) ? "success" : "error"}
        >
            <Toaster toasterId={hotkeyToasterId} />
            <Input
                value={temporaryHotkey}
                onChange={(_, { value }) => {
                    setTemporaryHotkey(value);
                }}
                onBlur={() => {
                    isValidHotkey(temporaryHotkey) ? setHotkey(temporaryHotkey) : setTemporaryHotkey(hotkey);
                }}
                contentAfter={
                    <Tooltip content={t("hotkeyMoreInfo", { ns })} relationship="label">
                        <Button
                            appearance="subtle"
                            size="small"
                            icon={<InfoRegular />}
                            onClick={() =>
                                contextBridge.openExternal("https://www.electronjs.org/docs/latest/api/accelerator")
                            }
                        />
                    </Tooltip>
                }
            />
        </Field>
    );
};
