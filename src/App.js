import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Toast, ToastContainer, Container, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiFillCheckSquare, AiTwotoneEdit } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import {
  FcPlus,
  FcCheckmark,
  FcDocument,
  FcOvertime,
  FcIdea,
} from "react-icons/fc";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskreducer.tasks);
  const [show, setShow] = useState(false);
  const filter = useSelector((state) => state.taskreducer.filter);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCurrentId(id);
  };
  const handleAdd = () => {
    dispatch({
      type: "ADD",
      payload: { description: input, id: uuidv4(), isDone: false },
    });
    setInput(" ");
  };

  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const [currentId, setCurrentId] = useState("");

  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand
            href="#"
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              fontFamily: "Lobster cursive",
              fontFamily: "Dancing Script,cursive",
            }}
          >
            <FcIdea style={{ fontSize: "50px" }} />
            Manage your time
          </Navbar.Brand>
        </Container>
      </Navbar>
      <center>
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "Lobster cursive",
            fontFamily: "Dancing Script,cursive",
            fontSize: "20px",
          }}
        >
          {" "}
          ADD YOUR TODOS...{" "}
        </div>
        <input
          style={{
            fontWeight: "bold",
            margin: "10px",
            backgroundColor: "Lavender",
          }}
          placeholder="add new task..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </center>

      <ButtonGroup aria-label="Basic example" onClick={handleAdd}>
        <FcPlus
          style={{
            display: "flex",
            margin: "20px",
            fontSize: "40px",
          }}
        ></FcPlus>
        <div> </div>
      </ButtonGroup>

      <center>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            minHeight: "240px",
            fontWeight: "bold",
          }}
        >
          DONE
          <FcCheckmark
            type="button"
            onClick={() =>
              dispatch({
                type: "Filter",
                payload: "done",
              })
            }
            style={{
              margin: "10px",
              fontSize: "30px",
              marginBottom: "10px",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Done!
          </FcCheckmark>
          ALL
          <FcDocument
            type="button"
            onClick={() =>
              dispatch({
                type: "Filter",
                payload: "all",
              })
            }
            style={{
              margin: "10px",
              fontSize: "30px",
              backgroundColor: "TCadetBlue",
              marginBottom: "10px",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            ALL!
          </FcDocument>
          NOT DONE
          <FcOvertime
            type="button"
            onClick={() =>
              dispatch({
                type: "Filter",
                payload: "undone",
              })
            }
            style={{
              margin: "10px",
              fontSize: "30px",
              marginBottom: "10px",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            NOT DONE!
          </FcOvertime>
          <ToastContainer className="p-3">
            <Toast>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">New tasks</strong>
              </Toast.Header>

              {tasks
                .filter((el) =>
                  filter === "all"
                    ? true
                    : filter === "undone"
                    ? el.isDone === false
                    : el.isDone === true
                )
                .map((el) => (
                  <Toast
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "Wheat",
                      textDecoration: el.isDone ? "line-through" : "none",
                    }}
                  >
                    {el.description}
                    <br />
                    <AiFillDelete
                      style={{
                        margin: "10px",
                        fontSize: "25px",
                        backgroundColor: "FireBrick",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "DELETE",
                          payload: el.id,
                        })
                      }
                    >
                      Delete!
                    </AiFillDelete>

                    <AiFillCheckSquare
                      style={{
                        margin: "10px",
                        fontSize: "25px",
                        backgroundColor: "ForestGreen",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "ISDONE",
                          payload: el.id,
                        })
                      }
                    >
                      Completed!
                    </AiFillCheckSquare>
                    <AiTwotoneEdit
                      style={{
                        margin: "5px",
                        fontSize: "25px",
                        backgroundColor: "LightBlue",
                      }}
                      onClick={() => handleShow(el.id)}
                    >
                      Edit!
                    </AiTwotoneEdit>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        {" "}
                        <div className="add"> Edit task </div>
                        <input
                          type="text"
                          name="post"
                          placeholder="Edit task ..."
                          onChange={(e) => setEdit(e.target.value)}
                        />
                        <br />
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "EDIT",
                              payload: {
                                description: edit,
                                id: currentId,
                              },
                            })
                          }
                          style={{
                            margin: "10px",

                            backgroundColor: "TCadetBlue",
                            marginBottom: "10px",
                            marginRight: "10px",
                            marginTop: "10px",
                          }}
                        >
                          SAVE!
                        </button>
                      </Modal.Body>
                    </Modal>
                  </Toast>
                ))}
            </Toast>
          </ToastContainer>
        </div>
      </center>
    </div>
  );
}

export default App;
