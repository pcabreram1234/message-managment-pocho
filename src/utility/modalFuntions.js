class ModalFuntions {
  constructor({ isLoading, modalMessage, alertModalType, modalInfoText }) {
    this.isLoading = isLoading;
    this.modalMessage = modalMessage;
    this.alertModalType = alertModalType;
    this.modalInfoText = modalInfoText;
  }

  closeModal() {
    if (this.alertModalType === "success") {
      this.modalMessage = "";
      this.alertModalType = "";
      this.isLoading = false;
    }
  }

  stopLoading() {
    this.isLoading = false;
  }

  /* Bloque de codigo que determina cuando cerrar o mantener abieto el modal */
  handleModalShow() {
    if (this.isLoading === true || this.alertModalType === "success") {
      setTimeout(() => {
        this.closeModal();
        this.stopLoading();
      }, 1500);
    } else {
      this.closeModal();
    }
  }
}

export { ModalFuntions };
