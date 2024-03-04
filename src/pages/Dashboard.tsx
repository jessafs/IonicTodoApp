import {
  InputChangeEventDetail,
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  chevronBackSharp,
  chevronDown,
  chevronForwardSharp,
  chevronUp,
  search,
} from "ionicons/icons";
import "./Dashboard.css";
import api from "../helper/api";
import { useEffect, useState } from "react";
import AddEditModal from "../components/Modal/AddEditModal";
const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<any>([]);
  const [defaultList, setDefaultList] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState(
    Array(todoList.length).fill(false)
  );
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const isEmpty = Object.values(data).some((x) => x === null || x === "");
  const handleInputTodo = (e: CustomEvent<InputChangeEventDetail>) => {
    const { value } = e?.detail;
    const dataInputId: any = (e?.target as EventTarget & HTMLIonInputElement)
      ?.dataset?.inputId;
    setData({ ...data, [dataInputId]: value });
  };

  const handleGetTodoList = async () => {
    let result = await api.getAllTodo();
    if (isEmpty && todoList.length === 0 && result.data.msg === "No Content") {
      setTodoList([]);
    } else {
      setTodoList(result.data ?? []);
      setDefaultList(result.data ?? []);
    }
  };
  const handleAddTodo = async () => {
    const { title, content } = data ?? {};
    if (!title || !content) {
      alert("All fields are required");
    } else {
      let res = await api.addTodo(data);
      setTodoList([...todoList, res.data]);
      // handleClose();
      setIsOpen(false);
      setData({
        title: "",
        content: "",
      });
    }
  };
  const handleOpenUpdateTodo = async (id: string) => {
    if (!id) {
      alert("Not found");
    } else {
      const res = await api.getById(id);
      const { data } = res.data;
      setBtnChange(true);
      setData({ ...data });
      setIsOpen(true);
    }
  };
  const handleUpdatetodo = async () => {
    const { title, content } = data ?? {};
    if (title || content) {
      const res = await api.updateTodo(data);
      handleGetTodoList();
      setTodoList([...todoList, res.data]);
      setIsOpen(false);
      setData({
        title: "",
        content: "",
      });
    } else {
      alert("No content to be update!");
    }
  };
  const handleRemoveList = async (id: string) => {
    try {
      if (!id) {
        alert("no id");
      } else {
        const res = await api.deleteTodo(id);
        let txt = "";
        if (window.confirm("Are you sure you want to delete this todo?")) {
          txt = "Successfully deleted!";
          const newData = todoList.filter((card: any) => card._id !== id);
          setTodoList(newData);
        } else {
          txt = "You pressed Cancel!";
        }
        handleGetTodoList();
        return res;
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  };
  const toggleDropdown = (index: number) => {
    const newOpenDropdowns = [...openDropdowns];
    newOpenDropdowns[index] = !newOpenDropdowns[index];
    setOpenDropdowns(newOpenDropdowns);
  };
  useEffect(() => {
    handleGetTodoList();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: "black" }}>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ textAlign: "end" }}>
          <IonButton
            className="add-btn"
            fill="outline"
            onClick={() => setIsOpen(true)}
          >
            Add to do
            <IonIcon icon={add} className="add-icon" />
          </IonButton>
        </div>
        <div>
          {todoList.map((todos: any, index: number) => (
            <IonList key={index} style={{ borderBottom: "1px solid #8a4e0f" }}>
              <IonGrid className="no-padding">
                <IonRow style={{ alignItems: "center" }}>
                  <IonCol size="7">{todos?.title}</IonCol>
                  <IonCol>
                    <IonButton
                      className="edit-btn"
                      fill="outline"
                      shape="round"
                      expand="full"
                      onClick={() => handleOpenUpdateTodo(todos._id)}
                    >
                      Edit
                    </IonButton>
                  </IonCol>
                  <IonCol size="auto">
                    <IonIcon
                      style={{ color: "#8a4e0f", fontSize: "20px" }}
                      icon={openDropdowns[index] ? chevronUp : chevronDown}
                      onClick={() => toggleDropdown(index)}
                    />
                  </IonCol>
                </IonRow>
                {openDropdowns[index] && (
                  <div>
                    <IonRow>
                      <IonCol>{todos?.content}</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          className="remove-btn"
                          fill="outline"
                          shape="round"
                          expand="full"
                          onClick={() => handleRemoveList(todos._id)}
                        >
                          Remove
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </div>
                )}
              </IonGrid>
            </IonList>
          ))}
        </div>
        <AddEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAddTodo={handleAddTodo}
          handleInputTodo={handleInputTodo}
          handleUpdatetodo={handleUpdatetodo}
          data={data}
          btnChange={btnChange}
        />
      </IonContent>
      {/* <IonFooter className="footer ion-no-border">
        <IonButton className="add-btn" fill="outline" expand="block">
          Add to do
          <IonIcon icon={add} className="add-icon" />
        </IonButton>
      </IonFooter> */}
    </IonPage>
  );
};
export default Dashboard;
