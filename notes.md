## Différence entre Express et Node.js :

-Node.js est l’environnement d’exécution JavaScript côté serveur. Il permet d’exécuter du JS hors du navigateur et fournit des API bas niveau (fichiers, réseau, etc.).
-Express est un framework web construit sur Node.js. Il simplifie la création d’applications web/API en fournissant des outils pour gérer les routes, les requêtes HTTP, les middlewares, etc.

## En résumé : Node.js = moteur d’exécution, Express = boîte à outils pour créer des serveurs web facilement avec Node.js.

---

##ts-node
ts-node te permet d’exécuter directement des fichiers TypeScript (.ts) sans avoir à les compiler d’abord en JavaScript avec la commande tsc.
Normalement, avec TypeScript, tu dois :

Compiler ton code avec tsc (TypeScript Compiler) pour obtenir des fichiers .js.
Exécuter ensuite ces fichiers .js avec Node.js.
Avec ts-node, tu peux lancer ton code TypeScript en une seule étape, par exemple :

npx ts-node src/index.ts

Cela accélère le développement, surtout pour tester rapidement des modifications, car tu n’as pas besoin de gérer manuellement la compilation à chaque fois.
En résumé : ts-node combine la compilation et l’exécution en une seule commande, ce qui rend le workflow TypeScript plus simple et rapide.

---

## --save-dev

On utilise --save-dev pour installer des dépendances qui ne sont nécessaires que lors du développement (et non en production).
Exemples : TypeScript, ts-node, nodemon, et les types (@types/...) servent uniquement à coder, compiler, ou tester, mais ne sont pas utilisés quand l’application tourne réellement sur un serveur.

Cela permet de séparer :

dependencies (utiles en production, ex : express)
devDependencies (utiles seulement en développement, ex : typescript, nodemon)
Ainsi, ton application sera plus légère et plus sécurisée en production, car elle n’embarque que l’essentiel.

---

## Nodemon

Nodemon est un outil qui surveille automatiquement les fichiers de votre projet Node.js et redémarre le serveur à chaque modification détectée. Cela permet de gagner du temps lors du développement, car vous n’avez pas besoin de relancer manuellement votre application après chaque changement de code. Il est très utilisé avec Express et TypeScript (via ts-node) pour un workflow de développement fluide.

## AuthMiddleware

Un middleware est une fonction qui reçoit les objets request et response, et le callback de la chaîne. Cela permet de traiter les requêtes avant de les envoyer au routeur.

Exemple d'utilisation pour vérifier si un utilisateur est authentifié avant d'accéder à une route protégée :

import { authenticate } from '../middlewares/authMiddleware';

router.get('/profile', authenticate, async (req, res) => {
const user = (req as any).user;
res.json({ success: true, message: "Bienvenue", user });
});

## npx tsc : Pour build le projet , tout ce qui se trouve dans le src est transformé en js et stocké dans le dist

npx tsc
