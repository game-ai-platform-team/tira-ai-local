
# Architecture
Websocket-based communications occur through App, using socket service. Chess, gomoku, connect4 and othello are subprocesses that run within a Game instance. 

```mermaid
classDiagram
    class FrontEnd {
        Elixir
    }
    class App {
    }
    class Game {
        Logger logger
        chess()
        gomoku()
        connect4()
        othello()
    }
    class SocketService {
    }
    class Logger {
    }

    FrontEnd <--> App: Websocket
    App <--> SocketService: Websocket
    App --> Game
    Game *-- Logger
```
