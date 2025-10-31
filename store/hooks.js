import { useDispatch, useSelector } from "react-redux";

// Typed hooks for TypeScript-like safety in JS
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
