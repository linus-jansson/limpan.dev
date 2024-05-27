import { Cc } from "./Cc";
// Basically only used in the /cookies page
export const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full container p-4 mx-auto bg-base-200/20">
            <Cc />
        </footer>
    );
}