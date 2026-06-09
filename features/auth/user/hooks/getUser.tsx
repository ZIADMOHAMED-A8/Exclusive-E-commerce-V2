"use client"
import { useQuery } from "@tanstack/react-query";
import getUserAction from "../actions/getUserAction";

export default function usegetUser(){
    return useQuery({
        queryKey:['getUser'],
        queryFn:()=>getUserAction()
    })
}
