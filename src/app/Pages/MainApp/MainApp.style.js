export const MainAppStyle = (theme) => ({
    mainContent: {
        height: "100vh",
        overflowY: "auto",
        "& .app-page": {
            height: "calc(100vh - 75px)",
            overflowY: "auto"
        }
    }
});