# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**SebaPro Connect** es un portal estudiantil para el Instituto Profesional San Sebastián. Permite a los estudiantes gestionar finanzas (crédito SebaPro), notas, asistencia, biblioteca, seguro académico y competencias. Es un prototipo en activo desarrollo, sin backend ni autenticación real.

## Comandos

```bash
npm run dev       # Servidor Vite en http://localhost:5173 (HMR)
npm run build     # Bundle optimizado en dist/
npm run lint      # ESLint (flat config, targets *.{js,jsx})
npm run preview   # Sirve el build de producción localmente
```

## Arquitectura

### Ruteo sin React Router
No hay librería de ruteo. `App.jsx` maneja la sesión con un estado ternario `'login' | 'app' | 'logout'` y las vistas con `activeView` (string). Para agregar una vista nueva: añadir la entrada en `VIEW_META` en `App.jsx`, el item en `NAV_ITEMS` en `Sidebar.jsx`, y el render condicional en `AppContent()`.

### Estado global (UserContext)
`src/context/UserContext.jsx` expone `{ currentUser, setCurrentUser, USERS }`. No hay Redux ni Zustand; toda la data del usuario viene de objetos mock en `src/data/users.js` (3 estudiantes con perfiles completos). Cambiar `currentUser` actualiza todos los componentes instantáneamente.

### Estructura del modelo de usuario
Cada objeto en `USERS` contiene: identidad (`nombre`, `rut`, `carrera`, `color`), finanzas SebaPro (`montoCuota`, `creditoAcumulado`), competencias (array con estado de validación), asignaturas con notas y asistencia, préstamos de biblioteca, y datos de seguro académico.

### Animaciones (Framer Motion)
Patrón estándar: definir `variants` fuera del componente → envolver con `motion.div` → usar `AnimatePresence` para transiciones de entrada/salida. Los contadores animados del Dashboard usan un hook custom `useCountUp()`. Duración estándar: 0.22–0.3 s, easing: `easeOut`.

### Estilos
CSS vanilla con design tokens en `:root` en `index.css` (paleta verde 9 tonos `--green-50` a `--green-900`, acentos `--gold`, `--red`, `--yellow`). Sin Tailwind ni framework CSS. Breakpoint principal: `@media (max-width: 768px)`. Las clases son globales; evitar colisiones siendo específico en los selectores.

### Iconos
Heroicons v2 (`@heroicons/react/24/outline` y `/24/solid`). Al importar ambos sets en el mismo componente, renombrar en el import para evitar colisiones:
```js
import { BellIcon as BellSolid } from '@heroicons/react/24/solid'
import { BellIcon as BellOutline } from '@heroicons/react/24/outline'
```

## Limitaciones conocidas del prototipo

- Navegación no refleja URL; los botones de browser back/forward no funcionan.
- Sin persistencia: cerrar el navegador borra el estado.
- Login es placeholder; no hay validación de credenciales.
