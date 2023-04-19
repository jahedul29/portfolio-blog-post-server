export const register = (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is register controller"
    })
}

export const login = (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is login controller"
    })
}