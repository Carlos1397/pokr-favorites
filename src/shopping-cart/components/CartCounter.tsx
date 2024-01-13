'use client';
import { useAppDispatch, useAppSelector } from "@/src/store";
import { decrement, increment,initCounterState } from "@/src/store/counter/counterSlice";
import { useEffect } from "react";

interface Props {
    value?: number;
   
}
export interface CounterResponse{
    method: string;
    count : number;
}
const getApiCounter = async () => {
    const data = await fetch('/api/counter').then(
        res => res.json()
    );
    console.log({data})
    return data as CounterResponse;
}

export const CartCounter = ({ value = 0 }: Props) => {
    const count = useAppSelector(state => state.counter.count);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(initCounterState(value));
    // }, [dispatch, value]);

    useEffect(()=>{
        getApiCounter()
        .then(({count}) => dispatch(initCounterState(count)))
    },[dispatch]);

    return (
        <>
            <span className="text-9xl"> {count} </span>
            <div className="flex gap-2 ">
                <button
                    onClick={() => dispatch(increment())}
                    className="flex items-center justify-center px-4 py-3  rounded-xl           
        transition ease-in-out delay-150 bg-gray-900 text-white hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 duration-300" >+1</button>
                <button
                    onClick={() => dispatch(decrement())}
                    className="flex items-center justify-center px-4 py-3 rounded-xl 
        transition ease-in-out delay-150 bg-gray-900 text-white hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 duration-300" >-1</button>
            </div>
        </>
    )
}
