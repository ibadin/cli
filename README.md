# @bitrix/cli 
@bitrix/cli&nbsp;— консольный инструмент Битрикс-разработчика, 
основная цель&nbsp;— упростить и&nbsp;автоматизировать разработку фронтенда для 
проектов на&nbsp;«Битрикс Управление Сайтом» и&nbsp;«Битрикс24».

[![npm version](https://badge.fury.io/js/%40bitrix%2Fcli.svg)](https://badge.fury.io/js/%40bitrix%2Fcli)


## Содержание
1. [Описание](#introduction)
2. [Установка](#install)
3. [Конфигурация](#config)
4. [Сборка](#build)
5. [Запуск тестов](#test)
6. [Создание экстеншна](#create)

<h2 id="introduction">Описание</h2>

@bitrix/cli&nbsp;— это набор консольных команд 
1. `bitrix build` для сборки и&nbsp;транспиляции ES6+ кода в&nbsp;кросс-браузерный ES5
2. `bitrix test` для запуска Mocha тестов
3. `bitrix create` для быстрого создания «экстеншна»

> В&nbsp;первую очередь, `@bitrix/cli` предназначен для работы «экстеншнами», 
шаблонами сайта и&nbsp;шаблонами компонентов. 


<h2 id="install">Установка</h2>

NPM
```bash
$ npm install -g @bitrix/cli
```

YARN
```bash
$ yarn global add @bitrix/cli
```

<h2 id="config">Конфигурация</h2>

### Базовая конфигурация 
```javascript
module.exports = {
	input: './app.js', 
	output: './dist/app.bundle.js',
};
```

### Все параметры 
```javascript
module.exports = {
	// Файл для которого необходимо выполнить сборку. 
	// Необходимо указать относительный путь 
	input: string, 
	
	// Путь к бандлу, который будет создан в результате сборки 
	// Обычно это ./dist/<extension_name>.bundle.js
	// Необходимо указать относительный путь 
	output: string,
	
	// Неймспейс, в который будут добавлены все экспорты из файла указанного в input
	// Например 'BX.Main.Filter'
	namespace: string,
	
	// Списки файлов для принудительного объединения. 
	// Файлы будут объединены без проверок на дублирование кода. 
	// sourcemap's объединяются автоматически 
	// Необходимо указать относительные пути
	concat: {
		js: Array<string>,
		css: Array<string>,
	},
	
	// Разрешает или запрещает сборщику модифицировать config.php
	// По умолчанию true (разрешено)
	adjustConfigPhp: boolean,
	
	// Разрешает или запрещает сборщику удалять неиспользуемый код. 
	// По умолчанию true (включено).
	treeshake: boolean,
	
	// Разрешает или запрещает пересобирать бандлы 
	// если сборка запущена не в корне текущего экстеншна 
	// По умолчанию `false` (разрешено)
	'protected': boolean,
	
	plugins: {
		// Переопределяет параметры Babel.
		// Можно указать собственные параметры Babel
		// https://babeljs.io/docs/en/options
		// Если указать false, то код будет собран без транспиляции
		babel: boolean | Object,
		
		// Дополнительные плагины Rollup, 
		// которые будут выполняться при сборке бандлов 
		custom: Array<string | Function>,
	},
};
```

<h2 id="build">Сборка</h2>

Для запуска сборки выполните команду 
```bash
$ bitrix build
```
> Сборщик рекурсивно найдет все файлы `bundle.config.js` и выполнит 
для каждого конфига сборку и транспиляцию. 

### Дополнительные параметры 

#### --watch, -w
Режим отслеживания изменений. Пересобирает бандлы после изменения исходных файлов.
```bash
$ bitrix build --watch
```

#### --test, -t
Режим непрерывного тестирования. Тесты запускаются после каждой сборки.
Обратите внимание, сборка с&nbsp;параметром `--test` выводит в&nbsp;отчете только статус прохождения 
тестов&nbsp;— прошли или не&nbsp;прошли, полный отчет выводит только команда `bitrix test`.
```bash
$ bitrix build --test
```

#### --modules, -m
Сборка только указанных модулей. Параметр поддерживается только в&nbsp;корневой c&nbsp;модулями `local/js` и `bitrix/modules`. 
В&nbsp;значении укажите имена модулей через запятую, например:
```bash
$ bitrix build --modules main,ui,landing
```

#### --path, -p
Запуск сборки для указанной директории. В&nbsp;значении укажите относительный путь к&nbsp;директории, 
например:
```bash
$ bitrix build --path ./main/install/js/main/loader
```


<h2 id="tests">Запуск тестов</h2>

Запускает Mocha тесты и&nbsp;выводит подробный отчет о&nbsp;прохождении тестов. 
> Тестами считаются&nbsp;JS файлы, расположенные в&nbsp;директории `./test`, 
  относительно файла `bundle.config.js`. В&nbsp;момент запуска тестов исходный код и&nbsp;код тестов, 
  налету обрабатывается сборщиком и&nbsp;после чего выполняется. Поэтому тесты можно писать на&nbsp;ES6+

### Дополнительные параметры 

#### --watch, -w
Режим отслеживания изменений. Запускает тесты после изменения исходных файлов и&nbsp;кода тестов.
```bash
$ bitrix test --watch
```

#### --modules, -m
Тестирование только указанных модулей. Параметр поддерживается только в 
корневой директории репозитория. В&nbsp;значении укажите имена модулей через запятую, 
например:
```bash
$ bitrix test --modules main,ui,landing
```

#### --path, -p
Запуск тестов для указанной директории. В&nbsp;значении укажите относительный путь к&nbsp;директории, 
например:
```bash
$ bitrix test --path ./main/install/js/main/loader.
```

<h2 id="create">Создание «экстеншна»</h2>

Для создания «экстеншна»
1. Перейдите в директорию `local/js/{module}`
2. Выполните команду `bitrix create`
3. Ответьте на вопросы мастера