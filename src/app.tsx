import * as React from "react";
import { Button, Rows, Text, NumberInput, Box } from "@canva/app-ui-kit";
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
  const [paragraphSpacing, setParagraphSpacing] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [previewText, setPreviewText] = React.useState("");
  const currentSelection = useSelection("plaintext");
  const isElementSelected = currentSelection.count == 1;

  // Auto-update preview whenever inputs or selection change
  /*React.useEffect(() => {
    async function updatePreviewText() {
      if (currentSelection.count !== 1) {
        setPreviewText("");
        return;
      }

      const draft = await currentSelection.read();
      const rawText = draft.contents.map((a) => a.text).join("");

      const paragraphs = rawText.split("\n");
      const nonEmptyParagraphs = paragraphs.filter((p) => p !== "");

      const spacedParagraphs = nonEmptyParagraphs.map((p) => {
        return p.trim() + "\n".repeat(paragraphSpacing);
      });

      const indentedParagraphs = spacedParagraphs.map((p) => {
        return " ".repeat(indentSize) + p.trimStart();
      });

      const indentedText = indentedParagraphs.join("\n");
      setPreviewText(indentedText);
    }

    updatePreviewText();
  }, [indentSize, paragraphSpacing, currentSelection]);
  */

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

    // Filter empty lines
    const nonEmptyParagraphs = paragraphs.filter((p) => {
      return p !== ""
    });

    const spacedParagraphs = nonEmptyParagraphs.map((p) => {
      // Remove existing spaces everywhere
      const trimAll = p.trim();
      // Add # of /n to end of paragraph
      return trimAll + "\n".repeat(paragraphSpacing);
    });

    const indentedParagraphs = spacedParagraphs.map((p) => {
      // Remove existing spaces at start
      const trimmed = p.trimStart();
      // Add # of spaces to beginning of paragraph
      return " ".repeat(indentSize) + trimmed;
    });

    const indentedText = indentedParagraphs.join("\n");

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

  //const visibleIndentedText = previewText
  //  .replace(/^ +/gm, (match) => '\u00A0'.repeat(match.length));

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text variant="bold">
          <FormattedMessage
            defaultMessage="
              Indent size
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


        <Text variant="bold">
          <FormattedMessage
            defaultMessage="
              Spacing size
            "
            description="Instructions for using the Canva Paragraph Indenter app."
            values={{
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <NumberInput
          value={paragraphSpacing}
          onChange={(value) => {
            if (typeof value === "number") {
              setParagraphSpacing(value);
            }
          }}          
          defaultValue={5}
          hasSpinButtons
          decrementAriaLabel={intl.formatMessage({ defaultMessage: "Decrease spacing", description: "" })}
          incrementAriaLabel={intl.formatMessage({ defaultMessage: "Increase spacing", description: "" })}
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
         {/*
        <Text variant="bold">
          <FormattedMessage
            defaultMessage="
              Text Preview
            "
            description="Instructions for using the Canva Paragraph Indenter app."
            values={{
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <Box
          background="neutralLow"
          borderRadius="large"
          padding="2u"
        >
          <Text 
            alignment="inherit"
          >
            {visibleIndentedText || "No text selected for preview."}
          </Text>
        </Box>
        */}

        <Button
          alignment="center"
          ariaLabel={intl.formatMessage({
            defaultMessage: "Fix Paragraphs",
            description: ""
          })}
          disabled = {currentSelection.count !=1}
          loading={loading}
          onClick={handleIndentParagraphs}
          variant="primary"
        >{intl.formatMessage({
          defaultMessage: "Fix Paragraphs",
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