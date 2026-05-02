import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { RefObject } from "react";
export default function NavigationArrows({containerRef}:{
    containerRef:RefObject<{
    new (): HTMLDivElement;
    prototype: HTMLDivElement;
}>
}) {
    return (
        <>
            <ArrowBigLeft onClick={() => {
                containerRef.current.scrollBy({
                    top: 0,
                    left: -1000,
                    behavior: "smooth"
                });
            }} size={20}  className="border-0 outline-0"></ArrowBigLeft>
            <ArrowBigRight  onClick={() => {
                containerRef.current.scrollBy({
                    top: 0,
                    left: 1000,
                    behavior: "smooth"
                });
            }}   size={20} ></ArrowBigRight>
        </>
    )
}