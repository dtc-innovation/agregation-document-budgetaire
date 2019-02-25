# agregation-document-budgetaire

Outil permettant de définir une agrégation d'un document budgétaire

## Présentation du problème - contexte

Le [travail avec le Conseil Départemental de la Gironde](https://github.com/datalocale/dataviz-finances-gironde/) a révélé que ces derniers ont plusieurs **vues** sur leur budget (Budget Prévisionnel ou Compte Administratif). Il y a la vue M52 brute qui est utilisée pour la communication avec l'État Français à vue de contrôles et vérifications\
La vue M52 nécessite que chaque dépense ou recette soit classée dans une **nature** ("quoi ?", par exemple, les dépenses de salaires, carburants, etc.) et dans une **fonction** ("pourquoi ?", par exemple, l'éducation, la sécurité, etc.). On peut ainsi faire des totaux pour chaque nature et pour chaque fonction

Il y a aussi la vue dite "agrégée" où chaque "élément" peut être un mélange de lignes budgétaires de natures et de fonction différentes, mais qui est plus cohérente avec la manière dont les services de Département fonctionnent, dont l'argent est réellement dépensé. Cette vue agrégée est aussi conçue avec une vision plus "politique" avec des (~80) ensembles plus facilement compréhensibles que la nomenclature M52 par les élus et le grand public

Cette vue agrégée existait depuis quelques années et a servi de base de présentation pour le [travail de transparence du Département](https://www.gironde.fr/un-budget-au-service-des-solidarites-humaine-et-territoriale). A des fins de transparence, ces formules [font partie du travail livré](https://github.com/datalocale/dataviz-finances-gironde/blob/master/src/shared/js/finance/m52ToAggregated.js), transparent et auditable comme le reste

Toutefois, nous avons découvert que la traduction en JavaScript de cette vue agrégée était un processus long et difficile. Le problème à résoudre est de créer une [partition](https://fr.wikipedia.org/wiki/Partition_d%27un_ensemble) avec les (~1200) lignes budgétaires. Initialement, chaque sous-ensemble de lignes était défini indépendamment et donc il n'était pas facile de vérifier la cohérence de l'ensemble (chaque ligne sans exception est dans un seul sous-ensemble)\
[Un outil](https://datalocale.github.io/dataviz-finances-gironde/) a été développé pour aider à découvrir rapidement ces problèmes de cohérence. Toutefois, même avec cet outil, le process restait le suivant : 
- une personne du métier des finances propose une définition de chaque sous-ensemble
- une personne traduit ces définitions en JavaScript
- on lance l'outil pour voir s'il reste des problèmes de cohérence
- on recommence s'il reste des problèmes

La personne du métier et celle traduisant en JavaScript n'étant pas la même, la boucle de feedback était assez lente

Ce projet a pour objectif de réduire drastiquement cette boucle de feedback


