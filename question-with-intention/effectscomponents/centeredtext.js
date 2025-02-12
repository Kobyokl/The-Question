// i dont use this trash aah generated code
import { useRef, useEffect } from "react";

export default function useCenteredText(textRef, textOpacity){
  const textMeshRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (textMeshRef.current) {
        // Adjust text position to ensure it's centered.
        const width = textMeshRef.current.geometry.boundingBox.getSize().x;
        const height = textMeshRef.current.geometry.boundingBox.getSize().y;
        
        // Center text by adjusting its position
        textMeshRef.current.position.set(-width / 2, -height / 2, 0);
      }
    };

    if (textOpacity > 0) {
      updatePosition();
    }

    // Recalculate position whenever opacity or text changes
  }, [textOpacity, textRef]);

  return textMeshRef;
};
