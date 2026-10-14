docker compose up -d
--

Luego ya:
cd ~/tfg/tfgWeb/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload

--

| Tailwind | CSS aproximado | Para qué sirve |
|---|---|---|
| `flex` | `display: flex` | Activa flexbox |
| `flex-col` | `flex-direction: column` | Hijos en vertical |
| `flex-row` | `flex-direction: row` | Hijos en horizontal |
| `items-center` | `align-items: center` | Centrar en eje secundario |
| `items-start` | `align-items: flex-start` | Alinear al inicio |
| `justify-center` | `justify-content: center` | Centrar en eje principal |
| `justify-between` | `justify-content: space-between` | Uno a cada extremo |
| `gap-2` | `gap: 0.5rem` | Separación entre hijos |
| `gap-4` | `gap: 1rem` | Más separación |
| `w-full` | `width: 100%` | Ancho completo |
| `h-full` | `height: 100%` | Alto completo |
| `w-32` | ancho fijo | Ancho predefinido |
| `h-32` | alto fijo | Alto predefinido |
| `max-w-6xl` | `max-width` | Limitar ancho máximo |
| `mx-auto` | márgenes izq/der auto | Centrar bloque |
| `m-4` | `margin` | Margen total |
| `mt-4` | `margin-top` | Margen arriba |
| `mb-4` | `margin-bottom` | Margen abajo |
| `ml-4` | `margin-left` | Margen izquierda |
| `mr-4` | `margin-right` | Margen derecha |
| `p-4` | `padding` | Espacio interior |
| `px-4` | padding horizontal | Izq + der |
| `py-4` | padding vertical | Arriba + abajo |
| `text-sm` | `font-size` pequeño | Texto pequeño |
| `text-lg` | `font-size` mayor | Texto grande |
| `text-2xl` | tamaño grande | Títulos |
| `font-bold` | `font-weight: 700` | Negrita |
| `text-center` | `text-align: center` | Centrar texto |
| `text-gray-500` | `color` | Color de texto |
| `bg-green-700` | `background-color` | Fondo |
| `border` | borde 1px | Borde |
| `border-2` | borde 2px | Borde más grueso |
| `border-gray-300` | color del borde | Color |
| `rounded` | `border-radius` | Bordes redondeados |
| `rounded-lg` | radio mayor | Más redondeado |
| `shadow` | `box-shadow` | Sombra |
| `overflow-hidden` | `overflow: hidden` | Oculta lo que sobresale |
| `object-cover` | `object-fit: cover` | Imagen rellenando sin deformar |
| `relative` | `position: relative` | Referencia para hijos absolute |
| `absolute` | `position: absolute` | Posición absoluta |
| `top-0` | `top: 0` | Arriba |
| `right-0` | `right: 0` | Derecha |
| `cursor-pointer` | cursor de mano | Indica que se puede pulsar |
| `hidden` | `display: none` | Oculta elemento |
| `block` | `display: block` | Bloque |
| `grid` | `display: grid` | Activa CSS Grid |
| `grid-cols-2` | 2 columnas | Grid de dos columnas |
| `flex-1` | `flex: 1` | Ocupa espacio disponible |