
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
{/* todo: the text padding breaks on resize after a collapse point */}
export default function LeftPanel(){
    return(
        <>
            
            <div className="cardcontainer" > 
                <div className="cardParentDiv">
                    {/* todo : add a component seperate for child cards and add the content as props*/}
                    <Card className="childCardComponent">
                        <CardTitle className="cardTitle">Plot Summary</CardTitle>
                        <CardContent>

                            <p>Card Content</p>
                        </CardContent>

                    </Card>

                    <Card className="childCardComponent">

                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>

                    </Card>
                    <Card className="childCardComponent">

                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </>
    );
}
