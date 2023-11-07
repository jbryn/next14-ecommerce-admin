"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = (props: AlertModalProps) => {
  const { isOpen, onClose, onConfirm, loading } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Are you sure?"
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex items-center justify-between w-full">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={loading} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
