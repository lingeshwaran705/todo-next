import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../src/store";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { setMultipleTodos } from "../src/features/todoSlice";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Error from "./Error";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Display() {
  const state = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [editTodo, setEditTodo] = useState<number | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/todos");
      dispatch(setMultipleTodos(response.data));
    })();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const deleteTodo = async (todo: string, id: number) => {
    const updatedTodo = state.filter((value) => value.todo !== todo);

    dispatch(setMultipleTodos(updatedTodo));

    const response = await axios.delete(`/api/todos/${id}`);

    console.log(response);
  };

  const updateTodo = async (todo: string, id: number) => {
    if (updatedTodo === "") {
      setError("Enter the todo to update");
      return;
    }
    setError("");

    const todoExists = state.filter((value) => value.todo === updatedTodo);

    if (todoExists.length !== 0) {
      setError("Todo Already Exists");
      setUpdatedTodo("");

      return;
    }
    setError("");

    const updated = state.map((value) =>
      value._id === id ? { ...value, todo: updatedTodo } : { ...value }
    );

    dispatch(setMultipleTodos(updated));

    setUpdatedTodo("");
    const response = await axios.put(`/api/todos/${id}`, {
      updatedTodo,
      todo,
    });
    console.log(response);
  };

  return (
    <>
      <Error error={error} />
      <ul className="pt-8">
        {state.map((item) => {
          return (
            <li
              className="my-4 bg-white px-3 shadow flex justify-between items-center"
              key={item._id}
            >
              {editTodo === item._id ? (
                <input
                  autoFocus={true}
                  type="text"
                  className="outline-none w-full"
                  value={updatedTodo}
                  placeholder={item.todo}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUpdatedTodo(event.target.value);
                  }}
                />
              ) : (
                <span className="inline-block py-1">{item.todo}</span>
              )}
              <aside className="ml-3 flex py-1">
                {editTodo === item._id ? (
                  <>
                    <IconButton sx={{ color: "orange" }}>
                      <CheckIcon
                        onClick={() => {
                          updateTodo(item.todo, item._id);
                          setEditTodo(null);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => {
                        setEditTodo(null);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      sx={{ color: "orange" }}
                      onClick={() => setEditTodo(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => deleteTodo(item.todo, item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </aside>
            </li>
          );
        })}
      </ul>
    </>
  );
}
