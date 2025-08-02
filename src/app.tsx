import * as React from "react";
import { Button, Rows, Text, NumberInput } from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useAddElement } from "utils/use_add_element";
import { useSelection } from "utils/use_selection_hook";

export const DOCS_URL = "https://www.canva.dev/docs/apps/";

export const App = () => {

  const addElement = useAddElement();
  const intl = useIntl();
  const [loading, setIsLoading] = React.useState(false);
  const [indentSize, setIndentSize] = React.useState(5);
  const [paragraphSpacing, setParagraphSpacing] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const currentSelection = useSelection("plaintext");
  const isElementSelected = currentSelection.count == 1;

  async function handleIndentParagraphs() {

    setIsLoading(true);

    if (currentSelection.count > 1) {
      setErrorMessage("Please select exactly one textbox.");
      setIsLoading(false);
      return;
    }    

    const draft = await currentSelection.read();

    const rawText = draft.contents.map((a) => a.text).join("");

    const paragraphs = rawText.split("\n");

    const indentedParagraphs = paragraphs.map((p) => {
      // Remove existing spaces at start (nice UX!)
      const trimmed = p.trimStart();
      // Add 4 spaces
      return " ".repeat(indentSize) + trimmed;
    });

    const separator = "\n".repeat(1 + paragraphSpacing);
    const indentedText = indentedParagraphs.join(separator);

    draft.contents = [{ text: indentedText }];
    try {
      await draft.save();
      setErrorMessage(""); // Clear any previous errors on success
      setSuccessMessage("Text successfully indented!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e) {
      setErrorMessage("Something went wrong while saving the textbox.");
    }       

    setIsLoading(false);

  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              Select a textbox, choose your indent size, and click to format your text.
            "
            description="Instructions for using the Canva Paragraph Indenter app."
            values={{
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <NumberInput
          value={indentSize}
          onChange={(value) => {
            if (typeof value === "number") {
              setIndentSize(value);
            }
          }}          
          defaultValue={5}
          hasSpinButtons
          decrementAriaLabel={intl.formatMessage({ defaultMessage: "Decrease indentation", description: "" })}
          incrementAriaLabel={intl.formatMessage({ defaultMessage: "Increase indentation", description: "" })}
          max={50}
          maxLength={2}
          maximumFractionDigits={0}
          min={0}
          placeholder={intl.formatMessage({
            defaultMessage: "Please enter a value between 0-50",
            description: ""
          })}
          step={1}
        />
        <Button
          alignment="center"
          ariaLabel={intl.formatMessage({
            defaultMessage: "Indent Paragraphs",
            description: ""
          })}
          disabled = {currentSelection.count !=1}
          loading={loading}
          onClick={handleIndentParagraphs}
          variant="primary"
        >{intl.formatMessage({
          defaultMessage: "Indent Paragraphs",
          description: ""
        })}
        </Button>
        {errorMessage && (
          <Text tone="critical">
            <strong>{errorMessage}</strong>
          </Text>
        )}
        {successMessage && (
          <Text>
            {successMessage}
          </Text>
        )}
      </Rows>
    </div>
  );
};