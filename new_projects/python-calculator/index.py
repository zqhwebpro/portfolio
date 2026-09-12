import tkinter as tk
from tkinter import ttk

# 1. VOLUME (Base: Fluid Ounces)
VOLUME_FACTORS = {
    "pinch": (1.0 / 6.0) / 16.0,
    "tsp": 1.0 / 6.0,
    "tbsp": 0.5,
    "fl_oz": 1.0,
    "cup": 8.0,
    "pint": 16.0,
    "quart": 32.0,
    "gallon": 128.0,
    "ml": 0.033814,
    "liter": 33.814,
}

# 2. WEIGHT (Base: Dry Ounces)
WEIGHT_FACTORS = {
    "dry_oz": 1.0,
    "lb": 16.0,
    "stone": 224.0,
    "gram": 0.035274,
    "kg": 35.274,
}

# 3. LENGTH / DIMENSIONS (Base: Inches)
LENGTH_FACTORS = {
    "in": 1.0,
    "ft": 12.0,
    "yd": 36.0,
    "mi": 63360.0,
    "cm": 0.393701,
    "m": 39.3701,
}

# 4. AREA / FLOORING (Base: Square Feet)
AREA_FACTORS = {
    "sq_in": 1.0 / 144.0,
    "sq_ft": 1.0,
    "sq_yd": 9.0,
    "acre": 43560.0,
    "sq_m": 10.7639,
}

VOLUME_LABELS = [
    ("Pinch (1/16 tsp)", "pinch"),
    ("Teaspoon (tsp)", "tsp"),
    ("Tablespoon (Tbsp)", "tbsp"),
    ("Fluid Ounces (fl oz)", "fl_oz"),
    ("Standard Cup (cup)", "cup"),
    ("Liquid Pint (pt)", "pint"),
    ("Liquid Quart (qt)", "quart"),
    ("US Gallon (gal)", "gallon"),
    ("Milliliters (ml)", "ml"),
    ("Liters (L)", "liter"),
]

WEIGHT_LABELS = [
    ("Ounces (oz)", "dry_oz"),
    ("Pounds (lbs)", "lb"),
    ("Stone (st)", "stone"),
    ("Grams (g)", "gram"),
    ("Kilograms (kg)", "kg"),
]

LENGTH_LABELS = [
    ("Inches (in)", "in"),
    ("Feet (ft)", "ft"),
    ("Yards (yd)", "yd"),
    ("Miles (mi)", "mi"),
    ("Centimeters (cm)", "cm"),
    ("Meters (m)", "m"),
]

AREA_LABELS = [
    ("Square Inches (sq in)", "sq_in"),
    ("Square Feet (sq ft)", "sq_ft"),
    ("Square Yards (sq yd)", "sq_yd"),
    ("Acres (acre)", "acre"),
    ("Square Meters (sq m)", "sq_m"),
]


def format_num(val):
    if abs(val) < 0.0001 and val != 0:
        return f"{val:.4f}"
    if abs(val - round(val)) < 0.005:
        return f"{int(round(val))}"
    return f"{val:.2f}"


class OmniScaleApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("OmniScale // Complete US Household Converter")
        self.geometry("1080x780")
        self.minsize(960, 700)

        # Dark Studio Palette
        self.c_bg = "#070A0F"
        self.c_card = "#0D111A"
        self.c_border = "#1E293B"
        self.c_input_bg = "#05070B"
        self.c_text = "#F8FAFC"
        self.c_muted = "#94A3B8"
        self.c_brand = "#F97316"
        self.c_sky = "#38BDF8"
        self.c_emerald = "#34D399"
        self.c_amber = "#FBBF24"
        self.c_indigo = "#818CF8"

        self.configure(bg=self.c_bg)
        self.updating = False

        self.vars = {
            "vol": {},
            "weight": {},
            "length": {},
            "area": {},
        }
        self.temp_vars = {}

        self._build_header()
        self._build_preset_bar()
        self._build_workspace()
        self._build_footer()

        # Seed initial state
        self._apply_preset("vol", "cup", 1)
        self._apply_preset("weight", "lb", 1)
        self._apply_preset("length", "ft", 8)
        self._apply_preset("area", "sq_ft", 100)
        self._on_temp_change("f", "350")

    def _build_header(self):
        header = tk.Frame(self, bg=self.c_card, padx=24, pady=16, highlightthickness=1, highlightbackground=self.c_border)
        header.pack(fill="x", side="top")

        left = tk.Frame(header, bg=self.c_card)
        left.pack(side="left")

        badge = tk.Label(
            left,
            text="OMNISCALE // US HOUSEHOLD STANDARD",
            font=("Segoe UI", 8, "bold"),
            fg=self.c_brand,
            bg="#26150B",
            padx=8,
            pady=2
        )
        badge.pack(anchor="w")

        title = tk.Label(
            left,
            text="Comprehensive Home, Kitchen & DIY Dimension Matrix",
            font=("Segoe UI", 16, "bold"),
            fg=self.c_text,
            bg=self.c_card
        )
        title.pack(anchor="w", pady=(2, 0))

        reset_btn = tk.Button(
            header,
            text="Reset All",
            command=self._clear_all,
            font=("Segoe UI", 9, "bold"),
            fg=self.c_text,
            bg="#1E293B",
            activebackground="#334155",
            activeforeground="#FFFFFF",
            relief="flat",
            padx=14,
            pady=6,
            cursor="hand2",
            bd=0
        )
        reset_btn.pack(side="right")

    def _build_preset_bar(self):
        bar = tk.Frame(self, bg=self.c_bg, padx=24, pady=8)
        bar.pack(fill="x")

        lbl = tk.Label(
            bar,
            text="POPULAR PRESETS:",
            font=("Segoe UI", 8, "bold"),
            fg=self.c_muted,
            bg=self.c_bg
        )
        lbl.pack(side="left", padx=(0, 10))

        presets = [
            ("1 Cup", "vol", "cup", 1),
            ("1 Gallon", "vol", "gallon", 1),
            ("1 lb Meat", "weight", "lb", 1),
            ("8 ft Ceiling", "length", "ft", 8),
            ("120 sq ft Room", "area", "sq_ft", 120),
            ("350°F Oven", "temp", "f", 350),
        ]

        for text, cat, key, val in presets:
            btn = tk.Button(
                bar,
                text=text,
                command=lambda c=cat, k=key, v=val: self._apply_preset(c, k, v),
                font=("Segoe UI", 8),
                fg=self.c_text,
                bg=self.c_card,
                activebackground=self.c_border,
                relief="flat",
                padx=8,
                pady=3,
                cursor="hand2",
                bd=0,
                highlightthickness=1,
                highlightbackground=self.c_border
            )
            btn.pack(side="left", padx=3)

    def _build_workspace(self):
        canvas_frame = tk.Frame(self, bg=self.c_bg, padx=20, pady=8)
        canvas_frame.pack(fill="both", expand=True)

        canvas_frame.columnconfigure(0, weight=1, uniform="col")
        canvas_frame.columnconfigure(1, weight=1, uniform="col")
        canvas_frame.columnconfigure(2, weight=1, uniform="col")

        # Column 1: Volume
        vol_card = self._create_card(canvas_frame, "  US VOLUME (COOKING & PANTRY)  ", self.c_sky)
        vol_card.grid(row=0, column=0, sticky="nsew", padx=6, pady=6)
        for idx, (label, key) in enumerate(VOLUME_LABELS):
            self._create_input_row(vol_card, label, key, idx, "vol")

        # Column 2: Weight & Area
        col2 = tk.Frame(canvas_frame, bg=self.c_bg)
        col2.grid(row=0, column=1, sticky="nsew", padx=6, pady=6)

        weight_card = self._create_card(col2, "  WEIGHT & MASS  ", self.c_emerald)
        weight_card.pack(fill="x", pady=(0, 10))
        for idx, (label, key) in enumerate(WEIGHT_LABELS):
            self._create_input_row(weight_card, label, key, idx, "weight")

        area_card = self._create_card(col2, "  FLOORING & YARD AREA  ", self.c_indigo)
        area_card.pack(fill="both", expand=True)
        for idx, (label, key) in enumerate(AREA_LABELS):
            self._create_input_row(area_card, label, key, idx, "area")

        # Column 3: Length & Temperature
        col3 = tk.Frame(canvas_frame, bg=self.c_bg)
        col3.grid(row=0, column=2, sticky="nsew", padx=6, pady=6)

        len_card = self._create_card(col3, "  LENGTH & DIMENSIONS  ", self.c_amber)
        len_card.pack(fill="x", pady=(0, 10))
        for idx, (label, key) in enumerate(LENGTH_LABELS):
            self._create_input_row(len_card, label, key, idx, "length")

        temp_card = self._create_card(col3, "  TEMPERATURE & OVEN  ", self.c_brand)
        temp_card.pack(fill="both", expand=True)
        for idx, (lbl, key) in enumerate([("Fahrenheit (°F)", "f"), ("Celsius (°C)", "c"), ("Gas Mark", "gas")]):
            self._create_temp_row(temp_card, lbl, key, idx)

    def _create_card(self, parent, title, color):
        return tk.LabelFrame(
            parent,
            text=title,
            font=("Segoe UI", 9, "bold"),
            fg=color,
            bg=self.c_card,
            relief="solid",
            bd=1,
            padx=12,
            pady=10
        )

    def _create_input_row(self, parent, label_text, key, row_idx, cat):
        lbl = tk.Label(parent, text=label_text, font=("Segoe UI", 8), fg=self.c_muted, bg=self.c_card, anchor="w")
        lbl.grid(row=row_idx, column=0, sticky="w", pady=3)

        var = tk.StringVar()
        entry = tk.Entry(
            parent,
            textvariable=var,
            font=("Consolas", 9, "bold"),
            bg=self.c_input_bg,
            fg=self.c_text,
            insertbackground=self.c_brand,
            relief="solid",
            bd=1,
            highlightthickness=1,
            highlightbackground=self.c_border,
            justify="right",
            width=12
        )
        entry.grid(row=row_idx, column=1, sticky="e", pady=3, padx=(8, 0))

        var.trace_add("write", lambda *args, c=cat, k=key, v=var: self._on_input(c, k, v))
        self.vars[cat][key] = var

    def _create_temp_row(self, parent, label_text, key, row_idx):
        lbl = tk.Label(parent, text=label_text, font=("Segoe UI", 8), fg=self.c_muted, bg=self.c_card, anchor="w")
        lbl.grid(row=row_idx, column=0, sticky="w", pady=3)

        var = tk.StringVar()
        entry = tk.Entry(
            parent,
            textvariable=var,
            font=("Consolas", 9, "bold"),
            bg=self.c_input_bg,
            fg=self.c_brand if key == "gas" else self.c_text,
            relief="solid",
            bd=1,
            highlightthickness=1,
            highlightbackground=self.c_border,
            justify="right",
            width=12,
            state="readonly" if key == "gas" else "normal"
        )
        entry.grid(row=row_idx, column=1, sticky="e", pady=3, padx=(8, 0))

        if key != "gas":
            var.trace_add("write", lambda *args, k=key, v=var: self._on_temp_input(k, v))
        self.temp_vars[key] = var

    def _get_factors(self, cat):
        if cat == "vol":
            return VOLUME_FACTORS
        elif cat == "weight":
            return WEIGHT_FACTORS
        elif cat == "length":
            return LENGTH_FACTORS
        elif cat == "area":
            return AREA_FACTORS
        return {}

    def _on_input(self, cat, key, var):
        if self.updating:
            return
        raw = var.get().strip()
        if not raw or raw in [".", "-"]:
            return
        try:
            val = float(raw)
        except ValueError:
            return

        self.updating = True
        try:
            factors = self._get_factors(cat)
            base_val = val * factors[key]
            for target_k, target_v in self.vars[cat].items():
                if target_k != key:
                    calculated = base_val / factors[target_k]
                    target_v.set(format_num(calculated))
        finally:
            self.updating = False

    def _on_temp_input(self, key, var):
        if self.updating:
            return
        raw = var.get().strip()
        self._on_temp_change(key, raw)

    def _on_temp_change(self, key, raw):
        if not raw or raw in [".", "-"]:
            return
        try:
            val = float(raw)
        except ValueError:
            return

        self.updating = True
        try:
            if key == "f":
                c = (val - 32.0) * (5.0 / 9.0)
                self.temp_vars["c"].set(format_num(c))
                f_val = val
            else:
                f = (val * 9.0 / 5.0) + 32.0
                self.temp_vars["f"].set(format_num(f))
                f_val = f

            if f_val < 250:
                gas = "1/4 (Slow)"
            elif f_val < 325:
                gas = "1-2 (Cool)"
            elif f_val < 375:
                gas = "3-4 (Moderate)"
            elif f_val < 425:
                gas = "5-6 (Hot)"
            else:
                gas = "7+ (Searing)"
            self.temp_vars["gas"].set(gas)
        finally:
            self.updating = False

    def _apply_preset(self, cat, key, val):
        if cat == "temp":
            self.temp_vars[key].set(str(val))
            self._on_temp_change(key, str(val))
        elif cat in self.vars and key in self.vars[cat]:
            self.vars[cat][key].set(str(val))

    def _clear_all(self):
        self.updating = True
        try:
            for cat in self.vars:
                for v in self.vars[cat].values():
                    v.set("")
        finally:
            self.updating = False

    def _build_footer(self):
        footer = tk.Frame(self, bg=self.c_card, padx=24, pady=10, highlightthickness=1, highlightbackground=self.c_border)
        footer.pack(fill="x", side="bottom")

        lbl = tk.Label(
            footer,
            text="OMNISCALE // Complete US Customary Household Engine",
            font=("Segoe UI", 8),
            fg=self.c_muted,
            bg=self.c_card
        )
        lbl.pack(side="left")


if __name__ == "__main__":
    app = OmniScaleApp()
    app.mainloop()