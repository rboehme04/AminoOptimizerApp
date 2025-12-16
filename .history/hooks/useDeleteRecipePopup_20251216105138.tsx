import PopUp from "@/components/popUp";
import { Color } from "@/constants/GlobalStyles";
import { useState, type ReactElement } from "react";

interface UseDeleteRecipePopupReturn {
  isVisible: boolean;
  showDeletePopup: () => void;
  handleDelete: () => void;
  DeletePopupComponent: ReactElement | null;
}

export function useDeleteRecipePopup(
  onDelete: () => void
): UseDeleteRecipePopupReturn {
  const [isVisible, setIsVisible] = useState(false);

  const showDeletePopup = () => {
    setIsVisible(true);
  };

  const handleDelete = () => {
    onDelete();
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const DeletePopupComponent = isVisible ? (
    <PopUp
      titleText="Rezept löschen?"
      descriptionText="Möchten Sie dieses Rezept wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
      leftButtonText="Abbrechen"
      rightButtonText="Löschen"
      rightButtonColor={Color.destructive50}
      isShowButtons={true}
      onClose={handleClose}
      onRightButtonPress={handleDelete}
    />
  ) : null;

  return {
    isVisible,
    showDeletePopup,
    handleDelete,
    DeletePopupComponent,
  };
}
