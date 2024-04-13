import * as React from "react";

export const useAutoResizeTextarea = (
  ref: React.ForwardedRef<HTMLTextAreaElement>,
  autoResize: boolean,
) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => textAreaRef.current!);

  const updateTextareaHeight = () => {
    const ref = textAreaRef?.current;
    if (ref && autoResize) {
      ref.style.height = "auto";
      ref.style.height = ref?.scrollHeight + "px";
    }
  };

  React.useEffect(() => {
    updateTextareaHeight();

    // const ref = textAreaRef?.current;
    // ref?.addEventListener("input", updateTextareaHeight);

    // return () => ref?.removeEventListener("input", updateTextareaHeight);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { textAreaRef, updateTextareaHeight }; // Return the updateTextareaHeight function
};
