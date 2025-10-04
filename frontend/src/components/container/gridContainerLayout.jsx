import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftPanel from "./leftPanelContainer"
import { Card } from "../ui/card"
import RightPanel from "./rightPanelContainer"

export default function GridContainerLayout(){
    return(
        <>
            <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <Card className="h-full">
                    <LeftPanel/>
                </Card>
            </ResizablePanel>
            <ResizableHandle  className="bg-black p-[2px] hover:bg-sky-900" />
            <ResizablePanel>
                <Card className="h-full py-0">
                    <RightPanel/>
                </Card>
            </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}