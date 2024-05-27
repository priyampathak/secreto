const {username, password} = process.env
export const connectionSrt = "mongodb+srv://"+username+":"+password+"@cluster0.ptwmhdb.mongodb.net/carmelDB?retryWrites=true&w=majority&appName=Cluster0"