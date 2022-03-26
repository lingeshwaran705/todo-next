import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../src/store";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { setMultipleTodos } from "../src/features/todoSlice";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Display() {
  const state = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>();
  const router = useRouter();
  const [editTodo, setEditTodo] = useState<number | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState<string>("");

  useEffect(() => {
    setToken(`${window.localStorage.getItem("token")}`);
    window.localStorage.getItem("token") ? null : router.push("/auth/register");
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/getalltodos", { token: token });
      dispatch(setMultipleTodos(response.data));
    })();
  }, [token]);

  const deleteTodo = async (todo: string) => {
    const updatedTodo = state.filter((value) => value.todo !== todo);

    dispatch(setMultipleTodos(updatedTodo));

    const response = await axios.post("/api/deletetodo", {
      todo: todo,
      token: token,
    });

    console.log(response);
  };

  const updateTodo = async (todo: string, id: number) => {
    const updated = state.map((value) =>
      value._id === id ? { ...value, todo: updatedTodo } : { ...value }
    );
    dispatch(setMultipleTodos(updated));
    const response = await axios.post("/api/updatetodo", {
      updatedTodo,
      todo,
      id,
    });
    console.log(response);
  };

  return (
    <>
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
                  className="outline-none"
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
                      sx={{ color: "orange" }}
                      onClick={() => deleteTodo(item.todo)}
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
