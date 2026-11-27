import React, { useEffect } from "react";

const FORM_ID = "WpjN1Xac6B55HNTYUoCl";

export function DemoForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.minai.biz/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <iframe
      src={`https://link.minai.biz/widget/form/${FORM_ID}`}
      style={{ width: "100%", height: "1058px", border: "none", borderRadius: "4px" }}
      id={`inline-${FORM_ID}`}
      data-layout='{"id":"INLINE"}'
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Website Registration"
      data-height="1058"
      data-layout-iframe-id={`inline-${FORM_ID}`}
      data-form-id={FORM_ID}
      title="Book a MinAI demo"
    />
  );
}
