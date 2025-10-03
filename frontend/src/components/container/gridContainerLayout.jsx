import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
export default function GridContainerLayout(){
    return(
        <>
            <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>

            </ResizablePanel>
            <ResizableHandle  className="bg-black p-[2px] hover:bg-sky-900" />
            <ResizablePanel>
            </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}