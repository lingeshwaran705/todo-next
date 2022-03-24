import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../src/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Display() {
  const state = useAppSelector((state) => state.todo);
  return (
    <ul>
      {state.map((item) => {
        return <li key={item.id}>{item.text}</li>;
      })}
    </ul>
  );
}
