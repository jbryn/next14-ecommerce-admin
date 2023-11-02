"use client";

import { Modal } from "@/components/ui/modal";

export default function Home() {
  return (
    <div className="p-4">
      <Modal title="test" description="test" onClose={() => {}} isOpen>
        children
      </Modal>
    </div>
  );
}
