"""
CHESSULATOR — The Baroque Chess & Win Evaluation Engine (Desktop Edition)
An upscale Baroque strategic chessboard and real-time win probability calculator.
"""

import math
import copy
import tkinter as tk
from tkinter import ttk, messagebox

# Piece Values in Centipawns
PIECE_VALUES = {
    'P': 100,
    'N': 320,
    'B': 335,
    'R': 500,
    'Q': 900,
    'K': 20000
}

# Piece-Square Tables (Midgame Evaluation)
PST = {
    'P': [
        [0,  0,  0,  0,  0,  0,  0,  0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5,  5, 10, 27, 27, 10,  5,  5],
        [0,  0,  0, 25, 25,  0,  0,  0],
        [5, -5,-10,  0,  0,-10, -5,  5],
        [5, 10, 10,-25,-25, 10, 10,  5],
        [0,  0,  0,  0,  0,  0,  0,  0]
    ],
    'N': [
        [-50,-40,-30,-30,-30,-30,-40,-50],
        [-40,-20,  0,  0,  0,  0,-20,-40],
        [-30,  0, 10, 15, 15, 10,  0,-30],
        [-30,  5, 15, 20, 20, 15,  5,-30],
        [-30,  0, 15, 20, 20, 15,  0,-30],
        [-30,  5, 10, 15, 15, 10,  5,-30],
        [-40,-20,  0,  5,  5,  0,-20,-40],
        [-50,-40,-30,-30,-30,-30,-40,-50]
    ],
    'B': [
        [-20,-10,-10,-10,-10,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5, 10, 10,  5,  0,-10],
        [-10,  5,  5, 10, 10,  5,  5,-10],
        [-10,  0, 10, 10, 10, 10,  0,-10],
        [-10, 10, 10, 10, 10, 10, 10,-10],
        [-10,  5,  0,  0,  0,  0,  5,-10],
        [-20,-10,-10,-10,-10,-10,-10,-20]
    ],
    'R': [
        [0,  0,  0,  0,  0,  0,  0,  0],
        [5, 10, 10, 10, 10, 10, 10,  5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [0,  0,  0,  5,  5,  0,  0,  0]
    ],
    'Q': [
        [-20,-10,-10, -5, -5,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5,  5,  5,  5,  0,-10],
        [-5,  0,  5,  5,  5,  5,  0, -5],
        [0,  0,  5,  5,  5,  5,  0, -5],
        [-10,  5,  5,  5,  5,  5,  0,-10],
        [-10,  0,  5,  0,  0,  0,  0,-10],
        [-20,-10,-10, -5, -5,-10,-10,-20]
    ],
    'K': [
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-20,-30,-30,-40,-40,-30,-30,-20],
        [-10,-20,-20,-20,-20,-20,-20,-10],
        [20, 20,  0,  0,  0,  0, 20, 20],
        [20, 30, 10,  0,  0, 10, 30, 20]
    ]
}

UNICODE_PIECES = {
    'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
    'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
}


class ChessGameState:
    def __init__(self):
        self.reset()

    def reset(self):
        self.board = [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            [None, None, None, None, None, None, None, None],
            [None, None, None, None, None, None, None, None],
            [None, None, None, None, None, None, None, None],
            [None, None, None, None, None, None, None, None],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
        ]
        self.turn = 'w'
        self.castling = {'wK': True, 'wQ': True, 'bK': True, 'bQ': True}
        self.en_passant = None  # (r, c)
        self.halfmove_clock = 0
        self.fullmove_number = 1
        self.history = []
        self.captured_white = []
        self.captured_black = []
        self.last_move = None
        self.is_game_over = False
        self.game_result = None

    def clone(self):
        copy_state = ChessGameState()
        copy_state.board = [row[:] for row in self.board]
        copy_state.turn = self.turn
        copy_state.castling = dict(self.castling)
        copy_state.en_passant = self.en_passant
        copy_state.halfmove_clock = self.halfmove_clock
        copy_state.fullmove_number = self.fullmove_number
        copy_state.last_move = self.last_move
        copy_state.is_game_over = self.is_game_over
        copy_state.game_result = self.game_result
        return copy_state

    def find_king(self, color):
        target = color + 'K'
        for r in range(8):
            for c in range(8):
                if self.board[r][c] == target:
                    return (r, c)
        return None

    def is_square_attacked(self, r, c, attacker_color):
        # Knight attacks
        for dr, dc in [(-2,-1), (-2,1), (-1,-2), (-1,2), (1,-2), (1,2), (2,-1), (2,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < 8 and 0 <= nc < 8:
                if self.board[nr][nc] == attacker_color + 'N':
                    return True

        # Pawn attacks
        pawn_dir = 1 if attacker_color == 'w' else -1
        for dc in [-1, 1]:
            pr, pc = r + pawn_dir, c + dc
            if 0 <= pr < 8 and 0 <= pc < 8:
                if self.board[pr][pc] == attacker_color + 'P':
                    return True

        # King attacks
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue
                kr, kc = r + dr, c + dc
                if 0 <= kr < 8 and 0 <= kc < 8:
                    if self.board[kr][kc] == attacker_color + 'K':
                        return True

        # Straight rays (Rook/Queen)
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            cur_r, cur_c = r + dr, c + dc
            while 0 <= cur_r < 8 and 0 <= cur_c < 8:
                p = self.board[cur_r][cur_c]
                if p:
                    if p == attacker_color + 'R' or p == attacker_color + 'Q':
                        return True
                    break
                cur_r += dr
                cur_c += dc

        # Diagonal rays (Bishop/Queen)
        for dr, dc in [(-1,-1), (-1,1), (1,-1), (1,1)]:
            cur_r, cur_c = r + dr, c + dc
            while 0 <= cur_r < 8 and 0 <= cur_c < 8:
                p = self.board[cur_r][cur_c]
                if p:
                    if p == attacker_color + 'B' or p == attacker_color + 'Q':
                        return True
                    break
                cur_r += dr
                cur_c += dc

        return False

    def is_in_check(self, color):
        k_pos = self.find_king(color)
        if not k_pos:
            return False
        enemy = 'b' if color == 'w' else 'w'
        return self.is_square_attacked(k_pos[0], k_pos[1], enemy)

    def generate_pseudo_moves(self, r, c):
        piece = self.board[r][c]
        if not piece:
            return []
        color, ptype = piece[0], piece[1]
        enemy = 'b' if color == 'w' else 'w'
        moves = []

        if ptype == 'P':
            fwd = -1 if color == 'w' else 1
            start_rank = 6 if color == 'w' else 1
            promo_rank = 0 if color == 'w' else 7

            # 1-step push
            nr = r + fwd
            if 0 <= nr < 8 and self.board[nr][c] is None:
                if nr == promo_rank:
                    for promo in ['Q', 'R', 'B', 'N']:
                        moves.append({'from': (r, c), 'to': (nr, c), 'promotion': promo})
                else:
                    moves.append({'from': (r, c), 'to': (nr, c)})
                    # 2-step push
                    nnr = r + (fwd * 2)
                    if r == start_rank and self.board[nnr][c] is None:
                        moves.append({'from': (r, c), 'to': (nnr, c), 'double_push': True})

            # Diagonal captures
            for dc in [-1, 1]:
                nc = c + dc
                if 0 <= nr < 8 and 0 <= nc < 8:
                    target = self.board[nr][nc]
                    if target and target[0] == enemy:
                        if nr == promo_rank:
                            for promo in ['Q', 'R', 'B', 'N']:
                                moves.append({'from': (r, c), 'to': (nr, nc), 'promotion': promo})
                        else:
                            moves.append({'from': (r, c), 'to': (nr, nc)})
                    elif self.en_passant and self.en_passant == (nr, nc):
                        moves.append({'from': (r, c), 'to': (nr, nc), 'en_passant': True})

        elif ptype == 'N':
            for dr, dc in [(-2,-1), (-2,1), (-1,-2), (-1,2), (1,-2), (1,2), (2,-1), (2,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < 8 and 0 <= nc < 8:
                    target = self.board[nr][nc]
                    if not target or target[0] == enemy:
                        moves.append({'from': (r, c), 'to': (nr, nc)})

        elif ptype in ['B', 'R', 'Q']:
            dirs = []
            if ptype in ['B', 'Q']:
                dirs.extend([(-1,-1), (-1,1), (1,-1), (1,1)])
            if ptype in ['R', 'Q']:
                dirs.extend([(-1,0), (1,0), (0,-1), (0,1)])

            for dr, dc in dirs:
                cur_r, cur_c = r + dr, c + dc
                while 0 <= cur_r < 8 and 0 <= cur_c < 8:
                    target = self.board[cur_r][cur_c]
                    if not target:
                        moves.append({'from': (r, c), 'to': (cur_r, cur_c)})
                    else:
                        if target[0] == enemy:
                            moves.append({'from': (r, c), 'to': (cur_r, cur_c)})
                        break
                    cur_r += dr
                    cur_c += dc

        elif ptype == 'K':
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == 0 and dc == 0:
                        continue
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < 8 and 0 <= nc < 8:
                        target = self.board[nr][nc]
                        if not target or target[0] == enemy:
                            moves.append({'from': (r, c), 'to': (nr, nc)})

            # Castling
            if not self.is_in_check(color):
                rank = 7 if color == 'w' else 0
                if r == rank and c == 4:
                    ks_key = color + 'K'
                    if self.castling[ks_key] and not self.board[rank][5] and not self.board[rank][6]:
                        if not self.is_square_attacked(rank, 5, enemy) and not self.is_square_attacked(rank, 6, enemy):
                            moves.append({'from': (r, c), 'to': (rank, 6), 'castle_k': True})
                    qs_key = color + 'Q'
                    if self.castling[qs_key] and not self.board[rank][3] and not self.board[rank][2] and not self.board[rank][1]:
                        if not self.is_square_attacked(rank, 3, enemy) and not self.is_square_attacked(rank, 2, enemy):
                            moves.append({'from': (r, c), 'to': (rank, 2), 'castle_q': True})

        return moves

    def get_legal_moves(self, r, c, force_color=None):
        piece = self.board[r][c]
        active_color = force_color or self.turn
        if not piece or piece[0] != active_color:
            return []
        pseudo = self.generate_pseudo_moves(r, c)
        legal = []
        for m in pseudo:
            sim = self.clone()
            sim.apply_move(m)
            if not sim.is_in_check(active_color):
                legal.append(m)
        return legal

    def get_all_legal_moves(self, color=None):
        if color is None:
            color = self.turn
        moves = []
        for r in range(8):
            for c in range(8):
                if self.board[r][c] and self.board[r][c][0] == color:
                    moves.extend(self.get_legal_moves(r, c, color))
        return moves

    def apply_move(self, move):
        fr, fc = move['from']
        tr, tc = move['to']
        piece = self.board[fr][fc]
        color, ptype = piece[0], piece[1]
        captured = self.board[tr][tc]

        self.board[fr][fc] = None

        if move.get('en_passant'):
            cap_row = tr + 1 if color == 'w' else tr - 1
            ep_cap = self.board[cap_row][tc]
            self.board[cap_row][tc] = None
            if color == 'w':
                self.captured_white.append(ep_cap)
            else:
                self.captured_black.append(ep_cap)
        elif captured:
            if color == 'w':
                self.captured_white.append(captured)
            else:
                self.captured_black.append(captured)

        if move.get('promotion'):
            self.board[tr][tc] = color + move['promotion']
        else:
            self.board[tr][tc] = piece

        if move.get('castle_k'):
            self.board[fr][5] = self.board[fr][7]
            self.board[fr][7] = None
        elif move.get('castle_q'):
            self.board[fr][3] = self.board[fr][0]
            self.board[fr][0] = None

        if ptype == 'K':
            if color == 'w':
                self.castling['wK'] = False
                self.castling['wQ'] = False
            else:
                self.castling['bK'] = False
                self.castling['bQ'] = False
        elif ptype == 'R':
            if fr == 7 and fc == 7: self.castling['wK'] = False
            if fr == 7 and fc == 0: self.castling['wQ'] = False
            if fr == 0 and fc == 7: self.castling['bK'] = False
            if fr == 0 and fc == 0: self.castling['bQ'] = False

        if move.get('double_push'):
            self.en_passant = ((fr + tr) // 2, fc)
        else:
            self.en_passant = None

        self.turn = 'b' if color == 'w' else 'w'
        self.last_move = {'from': (fr, fc), 'to': (tr, tc)}

    def make_move(self, move):
        snapshot = {
            'board': [row[:] for row in self.board],
            'turn': self.turn,
            'castling': dict(self.castling),
            'en_passant': self.en_passant,
            'captured_white': list(self.captured_white),
            'captured_black': list(self.captured_black),
            'last_move': self.last_move,
            'san': self.move_to_san(move)
        }
        self.apply_move(move)
        self.history.append(snapshot)

        # Check Game Over
        legal = self.get_all_legal_moves()
        if not legal:
            self.is_game_over = True
            if self.is_in_check(self.turn):
                self.game_result = "Black Wins by Checkmate (0-1)" if self.turn == 'w' else "White Wins by Checkmate (1-0)"
            else:
                self.game_result = "Draw by Stalemate (½-½)"

    def undo(self):
        if not self.history:
            return False
        prev = self.history.pop()
        self.board = prev['board']
        self.turn = prev['turn']
        self.castling = prev['castling']
        self.en_passant = prev['en_passant']
        self.captured_white = prev['captured_white']
        self.captured_black = prev['captured_black']
        self.last_move = prev['last_move']
        self.is_game_over = False
        self.game_result = None
        return True

    def move_to_san(self, move):
        if move.get('castle_k'): return 'O-O'
        if move.get('castle_q'): return 'O-O-O'
        fr, fc = move['from']
        tr, tc = move['to']
        piece = self.board[fr][fc]
        if not piece: return ''
        ptype = piece[1]
        files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
        target_str = files[tc] + ranks[tr]
        is_cap = self.board[tr][tc] is not None or move.get('en_passant')

        san = ''
        if ptype == 'P':
            if is_cap:
                san = files[fc] + 'x' + target_str
            else:
                san = target_str
            if move.get('promotion'):
                san += '=' + move['promotion']
        else:
            san = ptype + ('x' if is_cap else '') + target_str
        return san


def evaluate_board(state):
    mat_w, mat_b = 0, 0
    pst_w, pst_b = 0, 0
    center_w, center_b = 0, 0

    for r in range(8):
        for c in range(8):
            p = state.board[r][c]
            if not p:
                continue
            color, ptype = p[0], p[1]
            val = PIECE_VALUES.get(ptype, 0)
            pst_row = r if color == 'w' else (7 - r)
            pst_val = PST.get(ptype, [[0]*8]*8)[pst_row][c]

            if color == 'w':
                if ptype != 'K': mat_w += val
                pst_w += pst_val
                if 3 <= r <= 4 and 3 <= c <= 4: center_w += 25
                elif 2 <= r <= 5 and 2 <= c <= 5: center_w += 10
            else:
                if ptype != 'K': mat_b += val
                pst_b += pst_val
                if 3 <= r <= 4 and 3 <= c <= 4: center_b += 25
                elif 2 <= r <= 5 and 2 <= c <= 5: center_b += 10

    total_w = mat_w + pst_w + center_w
    total_b = mat_b + pst_b + center_b
    cp = total_w - total_b
    eval_score = cp / 100.0

    exponent = -cp / 400.0
    try:
        w_pct = 100.0 / (1.0 + math.pow(10, exponent))
    except OverflowError:
        w_pct = 99.9 if cp > 0 else 0.1
    w_pct = max(0.1, min(99.9, w_pct))
    b_pct = 100.0 - w_pct

    return {
        'score': eval_score,
        'centipawns': cp,
        'white_win_pct': round(w_pct, 1),
        'black_win_pct': round(b_pct, 1),
        'mat_w': mat_w,
        'mat_b': mat_b,
        'center_w': center_w,
        'center_b': center_b
    }


class ChessulatorApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Chessulator // The Baroque Win Evaluation Engine")
        self.geometry("1180x820")
        self.minsize(1050, 720)
        self.configure(bg="#0d080c")

        self.game = ChessGameState()
        self.selected_sq = None
        self.legal_moves = []
        self.hovered_moves = []

        self.square_size = 64
        self.setup_ui()
        self.draw_board()
        self.update_oracle()

    def setup_ui(self):
        # Master Style
        style = ttk.Style(self)
        style.theme_use('clam')

        # Header Frame
        header = tk.Frame(self, bg="#140d12", height=65, highlightthickness=1, highlightbackground="#9d711b")
        header.pack(fill=tk.X, side=tk.TOP)

        title_lbl = tk.Label(header, text="♚ CHESSULATOR", font=("Cinzel", 18, "bold"), fg="#faeab0", bg="#140d12")
        title_lbl.pack(side=tk.LEFT, padx=20, pady=10)

        sub_lbl = tk.Label(header, text="Baroque Chessboard & Sovereign Win Probability Oracle", font=("Georgia", 10, "italic"), fg="#c59427", bg="#140d12")
        sub_lbl.pack(side=tk.LEFT, padx=5, pady=12)

        btn_reset = tk.Button(header, text="New Match", font=("Cinzel", 9, "bold"), bg="#3a2410", fg="#faeab0", activebackground="#543916", activeforeground="#ffffff", relief=tk.FLAT, bd=1, padx=12, pady=4, command=self.reset_game)
        btn_reset.pack(side=tk.RIGHT, padx=15, pady=10)

        btn_undo = tk.Button(header, text="↶ Undo", font=("Cinzel", 9), bg="#2b1a0d", fg="#faeab0", activebackground="#452a14", relief=tk.FLAT, bd=1, padx=10, pady=4, command=self.undo_move)
        btn_undo.pack(side=tk.RIGHT, padx=5, pady=10)

        # Body Container
        body = tk.Frame(self, bg="#0d080c")
        body.pack(fill=tk.BOTH, expand=True, padx=20, pady=15)

        # Left Column: Chessboard Canvas & Turn Info
        left_col = tk.Frame(body, bg="#0d080c")
        left_col.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        self.turn_banner = tk.Label(left_col, text="White's Sovereign Move", font=("Cinzel", 13, "bold"), fg="#dfb15b", bg="#171016", highlightthickness=1, highlightbackground="#755216", pady=6)
        self.turn_banner.pack(fill=tk.X, pady=(0, 10))

        # Canvas Chassis
        canvas_frame = tk.Frame(left_col, bg="#2b1810", padx=12, pady=12, highlightthickness=3, highlightbackground="#dfb15b")
        canvas_frame.pack()

        self.canvas = tk.Canvas(canvas_frame, width=self.square_size * 8, height=self.square_size * 8, bg="#2e160e", highlightthickness=0)
        self.canvas.pack()
        self.canvas.bind("<Button-1>", self.on_canvas_click)
        self.canvas.bind("<Motion>", self.on_canvas_motion)
        self.canvas.bind("<Leave>", self.on_canvas_leave)

        # Right Column: The Sovereign Oracle (Large Win Calculation)
        right_col = tk.Frame(body, bg="#150e14", width=420, highlightthickness=1, highlightbackground="#9d711b", padx=20, pady=20)
        right_col.pack(side=tk.RIGHT, fill=tk.BOTH, padx=(20, 0))

        oracle_title = tk.Label(right_col, text="THE SOVEREIGN ORACLE", font=("Cinzel", 12, "bold"), fg="#dfb15b", bg="#150e14")
        oracle_title.pack(anchor=tk.N)

        sub_calc = tk.Label(right_col, text="CALCULATION TO WIN", font=("Cinzel", 16, "bold"), fg="#ffffff", bg="#150e14")
        sub_calc.pack(anchor=tk.N, pady=(2, 10))

        # Big Win Rate Grid
        pct_frame = tk.Frame(right_col, bg="#0d080c", highlightthickness=1, highlightbackground="#755216", padx=15, pady=15)
        pct_frame.pack(fill=tk.X, pady=10)

        # White side
        w_box = tk.Frame(pct_frame, bg="#0d080c")
        w_box.pack(side=tk.LEFT, expand=True)
        tk.Label(w_box, text="♔ WHITE", font=("Cinzel", 10, "bold"), fg="#dfb15b", bg="#0d080c").pack()
        self.w_pct_lbl = tk.Label(w_box, text="50.0%", font=("Cinzel", 26, "bold"), fg="#ffffff", bg="#0d080c")
        self.w_pct_lbl.pack()

        # Black side
        b_box = tk.Frame(pct_frame, bg="#0d080c")
        b_box.pack(side=tk.RIGHT, expand=True)
        tk.Label(b_box, text="♚ BLACK", font=("Cinzel", 10, "bold"), fg="#8c7784", bg="#0d080c").pack()
        self.b_pct_lbl = tk.Label(b_box, text="50.0%", font=("Cinzel", 26, "bold"), fg="#cccccc", bg="#0d080c")
        self.b_pct_lbl.pack()

        # Advantage Readout
        self.eval_lbl = tk.Label(right_col, text="Evaluation: +0.00 Centipawns", font=("Courier", 11, "bold"), fg="#dfb15b", bg="#150e14")
        self.eval_lbl.pack(pady=5)

        self.commentary_lbl = tk.Label(right_col, text='"Sovereign Parity across opening ranks."', font=("Georgia", 10, "italic"), fg="#faeab0", bg="#150e14", wraplength=360)
        self.commentary_lbl.pack(pady=5)

        # Hover Inspection Box
        self.hover_box = tk.Label(right_col, text="Hover piece to preview destination win rates", font=("Georgia", 9), fg="#9d711b", bg="#0d080c", relief=tk.SOLID, bd=1, pady=8, padx=10)
        self.hover_box.pack(fill=tk.X, pady=10)

        # Move Log Table
        tk.Label(right_col, text="ROYAL MATCH LEDGER", font=("Cinzel", 10, "bold"), fg="#dfb15b", bg="#150e14").pack(anchor=tk.W, pady=(10, 3))
        self.log_text = tk.Text(right_col, height=8, bg="#0d080c", fg="#faeab0", font=("Courier", 10), relief=tk.FLAT, bd=0)
        self.log_text.pack(fill=tk.BOTH, expand=True)

    def draw_board(self):
        self.canvas.delete("all")
        sq = self.square_size

        for r in range(8):
            for c in range(8):
                x1, y1 = c * sq, r * sq
                x2, y2 = x1 + sq, y1 + sq
                is_light = (r + c) % 2 == 0
                bg_color = "#ede2cf" if is_light else "#45281b"

                # Check highlight
                if self.game.is_in_check(self.game.turn):
                    k_pos = self.game.find_king(self.game.turn)
                    if k_pos and k_pos == (r, c):
                        bg_color = "#991b1b"

                # Selection highlight
                if self.selected_sq == (r, c):
                    bg_color = "#c59427"
                elif self.game.last_move and (self.game.last_move['from'] == (r, c) or self.game.last_move['to'] == (r, c)):
                    bg_color = "#8a6118"

                self.canvas.create_rectangle(x1, y1, x2, y2, fill=bg_color, outline="#2b1810")

                # Piece Drawing
                piece = self.game.board[r][c]
                if piece:
                    symbol = UNICODE_PIECES.get(piece, '')
                    fg_color = "#fef7dc" if piece[0] == 'w' else "#1a1217"
                    shadow_color = "#000000"
                    self.canvas.create_text(x1 + sq//2 + 1, y1 + sq//2 + 1, text=symbol, font=("Arial", int(sq * 0.58)), fill=shadow_color)
                    self.canvas.create_text(x1 + sq//2, y1 + sq//2, text=symbol, font=("Arial", int(sq * 0.58)), fill=fg_color)

        # Destination Target Overlays & Live Percentages
        active_moves = self.legal_moves if (self.selected_sq and self.legal_moves) else self.hovered_moves
        current_eval = evaluate_board(self.game)
        current_win = current_eval['white_win_pct'] if self.game.turn == 'w' else current_eval['black_win_pct']

        for m in active_moves:
            tr, tc = m['to']
            x1, y1 = tc * sq, tr * sq
            x2, y2 = x1 + sq, y1 + sq
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

            # Simulate
            sim = self.game.clone()
            sim.apply_move(m)
            sim_eval = evaluate_board(sim)
            res_win = sim_eval['white_win_pct'] if self.game.turn == 'w' else sim_eval['black_win_pct']
            delta = res_win - current_win

            # Ring or badge color
            ring_color = "#10b981" if delta >= 0 else "#ef4444"
            self.canvas.create_oval(cx - 10, cy - 10, cx + 10, cy + 10, fill=ring_color, outline="#faeab0", width=1.5)
            self.canvas.create_text(cx, y2 - 8, text=f"{int(res_win)}%", font=("Arial", 8, "bold"), fill="#ffffff")

    def on_canvas_motion(self, event):
        c = event.x // self.square_size
        r = event.y // self.square_size
        if 0 <= r < 8 and 0 <= c < 8:
            if not self.selected_sq:
                piece = self.game.board[r][c]
                if piece and piece[0] == self.game.turn:
                    self.hovered_moves = self.game.get_legal_moves(r, c)
                    self.draw_board()
                    self.hover_box.config(text=f"Hovered {piece[1]} at {chr(ord('a')+c)}{8-r} — {len(self.hovered_moves)} moves available", fg="#faeab0")
                    return
        if not self.selected_sq:
            if self.hovered_moves:
                self.hovered_moves = []
                self.draw_board()
                self.hover_box.config(text="Hover piece to preview destination win rates", fg="#9d711b")

    def on_canvas_leave(self, event):
        if not self.selected_sq:
            self.hovered_moves = []
            self.draw_board()
            self.hover_box.config(text="Hover piece to preview destination win rates", fg="#9d711b")

    def on_canvas_click(self, event):
        if self.game.is_game_over:
            messagebox.showinfo("Game Over", self.game.game_result)
            return

        c = event.x // self.square_size
        r = event.y // self.square_size
        if not (0 <= r < 8 and 0 <= c < 8):
            return

        piece = self.game.board[r][c]

        # Select piece
        if not self.selected_sq:
            if piece and piece[0] == self.game.turn:
                self.selected_sq = (r, c)
                self.legal_moves = self.game.get_legal_moves(r, c)
                self.draw_board()
            return

        # Switch selection
        if piece and piece[0] == self.game.turn:
            if self.selected_sq == (r, c):
                self.selected_sq = None
                self.legal_moves = []
            else:
                self.selected_sq = (r, c)
                self.legal_moves = self.game.get_legal_moves(r, c)
            self.draw_board()
            return

        # Move execution
        matched = [m for m in self.legal_moves if m['to'] == (r, c)]
        if matched:
            self.game.make_move(matched[0])
            self.selected_sq = None
            self.legal_moves = []
            self.hovered_moves = []
            self.draw_board()
            self.update_oracle()

            if self.game.is_game_over:
                messagebox.showinfo("Match Finished", self.game.game_result)
        else:
            self.selected_sq = None
            self.legal_moves = []
            self.draw_board()

    def update_oracle(self):
        eval_data = evaluate_board(self.game)
        w_pct = eval_data['white_win_pct']
        b_pct = eval_data['black_win_pct']
        score = eval_data['score']

        self.w_pct_lbl.config(text=f"{w_pct}%")
        self.b_pct_lbl.config(text=f"{b_pct}%")
        self.eval_lbl.config(text=f"Advantage: {'+' if score >= 0 else ''}{score:.2f} Centipawns")

        if self.game.is_game_over:
            self.commentary_lbl.config(text=self.game.game_result)
        elif score > 2.0:
            self.commentary_lbl.config(text='"Decisive White Supremacy — Opponent ranks pierced."')
        elif score < -2.0:
            self.commentary_lbl.config(text='"Decisive Black Conquest — Inevitable checkmate approaching."')
        else:
            self.commentary_lbl.config(text='"Balanced sovereign tension. Equilibrium across the board."')

        turn_str = "White's Sovereign Move" if self.game.turn == 'w' else "Black's Imperial Move"
        self.turn_banner.config(text=turn_str)

        # Move Log Table
        self.log_text.delete("1.0", tk.END)
        for i in range(0, len(self.game.history), 2):
            num = (i // 2) + 1
            w_san = self.game.history[i]['san']
            b_san = self.game.history[i+1]['san'] if (i+1) < len(self.game.history) else ''
            self.log_text.insert(tk.END, f"{num:2d}. {w_san:<8} {b_san:<8}\n")

    def undo_move(self):
        if self.game.undo():
            self.selected_sq = None
            self.legal_moves = []
            self.draw_board()
            self.update_oracle()

    def reset_game(self):
        self.game.reset()
        self.selected_sq = None
        self.legal_moves = []
        self.draw_board()
        self.update_oracle()


if __name__ == "__main__":
    app = ChessulatorApp()
    app.mainloop()