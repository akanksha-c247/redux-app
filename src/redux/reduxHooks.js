import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";

export const useAppDispatch = () => useDispatch();
export const useAppSelector =  useSelector;
export const useAppNavigate =  useNavigate;
