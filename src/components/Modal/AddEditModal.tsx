import {
  IonModal,
  IonContent,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonInput,
  IonTextarea,
  IonLabel,
  IonText,
  IonButton,
  InputChangeEventDetail,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import "./AddEditModal.css";
import { useState } from "react";
import { QuillModule } from "ngx-quill";

const AddEditModal = (props: any) => {
  const {
    isOpen,
    setIsOpen,
    handleInputTodo,
    handleAddTodo,
    data,
    btnChange,
    handleUpdatetodo,
  } = props;
  const closeModal = () => {
    setIsOpen(false);
    // presentAlert({
    //   message: `<img src="${warning}" class="toast-cancel-icon"/><span class="toast-cancel-header-message">Are you sure you want to stop scheduling this service?<span/><br/> <span class="toast-cancel-message">You may book this service again at any time.<span/>`,
    //   backdropDismiss: false,
    //   cssClass: "success-toast",
    //   buttons: [
    //     {
    //       text: "Continue",
    //       cssClass: "toast-continue-btn",
    //       handler: () => {
    //         closeAlert();
    //       },
    //     },
    //     {
    //       text: "Exit",
    //       cssClass: "toast-exit-btn",
    //       handler: () => {
    //         setIsOpen(false);
    //       },
    //     },
    //   ],
    // });
  };

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader class="ion-no-border">
          <IonToolbar style={{ height: "47px" }}>
            <IonTitle style={{ top: "0px" }} className="scheduler-title">
              Create Todo
            </IonTitle>
            <IonButtons slot="end">
              <IonIcon
                className="close-modal-icon"
                onClick={closeModal}
                icon={closeOutline}
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ margin: "40px 0px 20px" }}>
            <p className="title-label">Title</p>
            <IonInput
              placeholder="Title"
              data-input-id="title"
              className="title-input"
              value={data.title}
              onIonInput={handleInputTodo}
            />
            <p className="title-label">Description</p>
            <IonTextarea
              label=""
              labelPlacement="floating"
              autoGrow={true}
              data-input-id="content"
              onIonInput={handleInputTodo}
              value={data.content}
              fill="outline"
              className="textarea-desc"
              placeholder="Write details to your todo"
            />
            {btnChange ? (
              <IonButton
                className="save-btn"
                shape="round"
                expand="full"
                onClick={handleUpdatetodo}
              >
                Update
              </IonButton>
            ) : (
              <IonButton
                className="save-btn"
                shape="round"
                expand="full"
                onClick={handleAddTodo}
              >
                Save
              </IonButton>
            )}
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};
export default AddEditModal;
