import { Button } from "./ui/button";

type LoadingProps = {
  pending: boolean;
  children: React.ReactNode;
};

export function LoadingButton({ pending, children }: LoadingProps) {
  return (
    <Button className="w-full" type="submit">
      {pending ? (
        <div className="flex items-center justify-center">loading...</div>
      ) : (
        children
      )}
    </Button>
  );
}
export function UpdateButton({ pending, children }: LoadingProps) {
  return (
    <Button className="max-w-[200px]" type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center">loading...</div>
      ) : (
        children
      )}
    </Button>
  );
}
