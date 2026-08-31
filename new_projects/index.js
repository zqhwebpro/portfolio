const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<window.App />);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);