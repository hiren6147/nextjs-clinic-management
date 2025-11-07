import { Card, CardContent } from "../ui/card";

interface ErrorCompProps {
  message: string;
}

const ErrorComp = ({ message }: ErrorCompProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default ErrorComp;
