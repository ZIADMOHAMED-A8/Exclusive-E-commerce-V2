"use client"
import { useQuery } from "@tanstack/react-query";
import getUserAction from "../actions/getUserAction";
import { queryClient } from "@/context/query.provider";

export default function usegetUser(){
    return useQuery({
        queryKey:['getUser'],
        queryFn:()=>getUserAction(),
        retry: false,
    })
}
