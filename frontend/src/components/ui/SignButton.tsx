interface StateButtonProps {
    color: string;
    text: string;
    tcol: string;
}

const SignButton: React.FC<StateButtonProps> = ({ color, text, tcol }) => {
    return (
        <div
            className={`uppercase max-h-10 rounded-full px-4 py-2 text-${tcol} bg-${color} `}
        >
            {text}
        </div>
    );
};

export default SignButton;
