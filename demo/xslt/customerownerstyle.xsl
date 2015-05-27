<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
	<html>
		<head>
			<title>Customers &amp; Owners</title>
			<style type="text/css">
				body {
					font-family: Verdana, Geneva, "DejaVu Sans", sans-serif;
					font-height: 20px;
				}

				h1, h2 {
					text-align: center;
				}

				h2 {
					padding-bottom: 10px;
					border-bottom: 1px solid black;
				}

				.person {
					display: block;
					margin: 20px 10px;
					padding: 10px;
					width: 250px;
					float: left;
					border: 1px solid #999999;
					border-radius: 7px;
					box-shadow: 5px 3px 3px rgba(0, 0, 0, .3)
				}

				.line {
					display: block;
					height: 30px;
					margin: 5px;
				}

				.line svg, .line img {
					vertical-align: middle;
					height: 20px;
					width: 20px;
				}


				.data {
					display: inline-block;
					margin-left: 20px;
				}

				footer {
					clear: both;
				}
			</style>
		</head>
		<body>
			<h1>Auntie B's Consignment Shop</h1>
			<h2>List of Owners</h2>
			<xsl:for-each select="list/custowner">
				<div class="person">
					<div class="line">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 558.14 558.14" xml:space="preserve" enable-background="new 0 0 558.144 558.144">
						<path d="M509.8 358.63c5.31 2.86 9.49 6.94 12.55 12.24 3.06 5.3 4.59 11.42 4.59 18.36v135.86c0 9.38-2.65 17.24-7.96 23.56 -5.31 6.32-12.03 9.49-20.19 9.49H59.36c-8.16 0-14.89-3.16-20.2-9.49s-7.96-14.18-7.96-23.56V389.23c0-6.94 1.53-13.16 4.59-18.67s7.45-9.49 13.16-11.94l171.97-80.17c-20.81-12.24-37.43-29.89-49.88-52.94s-18.67-49.06-18.67-78.03c0-20.4 3.26-39.58 9.79-57.53 6.53-17.95 15.5-33.56 26.93-46.82 11.42-13.26 24.89-23.77 40.39-31.52C245 3.88 261.53 0 279.07 0c17.54 0 34.07 3.88 49.57 11.63s28.97 18.26 40.39 31.52c11.42 13.26 20.4 28.87 26.93 46.82 6.53 17.95 9.79 37.13 9.79 57.53 0 28.15-6.12 53.75-18.36 76.81s-28.35 40.9-48.35 53.55L509.8 358.63 509.8 358.63z" fill="#010002"/>
						</svg>
						<span class="data"><xsl:value-of select="name"/></span>
					</div>
					<div class="line">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 51.41 51.41" xml:space="preserve" enable-background="new 0 0 51.413 51.413" width="20" height="20">
						<path d="M25.99 12.27c8.66 0.09 14.09-0.45 14.82 9.15h10.56c0-14.87-12.97-16.88-25.66-16.88 -12.69 0-25.66 2.01-25.66 16.88h10.48C11.35 11.64 17.4 12.19 25.99 12.27z" fill="#010002"/>
						<path d="M5.29 26.2c2.57 0 4.71 0.15 5.19-2.38 0.06-0.34 0.1-0.73 0.1-1.18H10.46 0C0 26.41 2.37 26.2 5.29 26.2z" fill="#010002"/>
						<path d="M40.88 22.64h-0.1c0 0.45 0.04 0.85 0.11 1.19 0.5 2.33 2.64 2.19 5.2 2.19 2.94 0 5.32 0.19 5.32-3.37H40.88z" fill="#010002"/>
						<path d="M35.72 20.08v-1.5c0-0.67-0.77-0.71-1.72-0.71h-1.55c-0.95 0-1.72 0.04-1.72 0.71v1.29 1h-11v-1 -1.29c0-0.67-0.77-0.71-1.72-0.71h-1.56c-0.95 0-1.72 0.04-1.72 0.71v1.5 1.31C12.21 23.99 4.01 35.07 3.72 36.42l0 8.96c0 0.83 0.67 1.5 1.5 1.5h40c0.83 0 1.5-0.67 1.5-1.5v-9c-0.29-1.3-8.49-12.38-11-14.99V20.08zM19.18 37.62c-0.8 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46 1.46 0.65 1.46 1.46S19.98 37.62 19.18 37.62zM19.18 32.62c-0.8 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46 1.46 0.65 1.46 1.46S19.98 32.62 19.18 32.62zM19.18 27.62c-0.8 0-1.46-0.65-1.46-1.46 0-0.8 0.65-1.46 1.46-1.46s1.46 0.65 1.46 1.46C20.64 26.97 19.98 27.62 19.18 27.62zM25.18 37.62c-0.8 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46c0.81 0 1.46 0.65 1.46 1.46S25.98 37.62 25.18 37.62zM25.18 32.62c-0.8 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46c0.81 0 1.46 0.65 1.46 1.46S25.98 32.62 25.18 32.62zM25.18 27.62c-0.8 0-1.46-0.65-1.46-1.46 0-0.8 0.65-1.46 1.46-1.46 0.81 0 1.46 0.65 1.46 1.46C26.64 26.97 25.98 27.62 25.18 27.62zM31.18 37.62c-0.81 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46 1.46 0.65 1.46 1.46S31.98 37.62 31.18 37.62zM31.18 32.62c-0.81 0-1.46-0.65-1.46-1.46s0.65-1.46 1.46-1.46 1.46 0.65 1.46 1.46S31.98 32.62 31.18 32.62zM31.18 27.62c-0.81 0-1.46-0.65-1.46-1.46 0-0.8 0.65-1.46 1.46-1.46s1.46 0.65 1.46 1.46C32.64 26.97 31.98 27.62 31.18 27.62z" fill="#010002"/>
						</svg>
						<span class="data"><xsl:value-of select="phone"/></span>
					</div>
					<div class="line">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="20" height="20" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
						<path d="M324.7 80.78h-0.81V34.23c0-13.4-10.88-24.28-24.28-24.28 -13.42 0-24.29 10.89-24.29 24.29v46.56h-88.01c-31.8 0-57.57 25.79-57.57 57.55V444.49c0 31.78 25.77 57.57 57.57 57.57h137.39c31.8 0 57.57-25.79 57.57-57.57V138.34C382.27 106.57 356.49 80.78 324.7 80.78zM239.48 440.36c0 5.09-4.15 9.23-9.23 9.23H193.65c-5.09 0-9.22-4.15-9.22-9.23v-36.6c0-5.09 4.13-9.22 9.22-9.22h36.6c5.08 0 9.23 4.13 9.23 9.22V440.36zM239.48 357.77c0 5.09-4.15 9.22-9.23 9.22H193.65c-5.09 0-9.22-4.14-9.22-9.22v-36.59c0-5.1 4.13-9.24 9.22-9.24h36.6c5.08 0 9.23 4.14 9.23 9.24V357.77zM327.6 440.36c0 5.09-4.15 9.23-9.24 9.23h-36.59c-5.09 0-9.24-4.15-9.24-9.23v-36.6c0-5.09 4.15-9.22 9.24-9.22h36.59c5.09 0 9.24 4.13 9.24 9.22V440.36zM327.6 357.77c0 5.09-4.15 9.22-9.24 9.22h-36.59c-5.09 0-9.24-4.14-9.24-9.22v-36.59c0-5.1 4.15-9.24 9.24-9.24h36.59c5.09 0 9.24 4.14 9.24 9.24V357.77zM344.12 249.05c0 10.2-8.29 18.49-18.49 18.49H186.4c-10.22 0-18.51-8.29-18.51-18.49v-105.24c0-10.21 8.28-18.49 18.51-18.49h139.23c10.21 0 18.49 8.28 18.49 18.49V249.05z"/>
						</svg>
						<span class="data"><xsl:value-of select="cellphone"/></span>
					</div>
					<div class="line">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 576.5 576.5" xml:space="preserve" enable-background="new 0 0 576.504 576.504">
						<path d="M7.96 447.37c-0.41 0.81-1.43 1.23-3.06 1.23H3.06c-2.04-1.23-3.06-2.65-3.06-4.28V200.12c0-2.04 0.82-3.47 2.45-4.28 1.63-0.41 3.26-0.41 4.9 0l162.79 93.02c1.63 0.81 2.45 2.04 2.45 3.67 0 2.04-0.61 3.26-1.84 3.67L7.96 447.37zM555.08 514.69c1.23 1.63 1.63 3.26 1.23 4.9 -1.23 2.04-2.85 3.06-4.9 3.06H18.97c-2.86 0-5.92-1.02-9.18-3.06 -1.63-0.82-2.45-2.04-2.45-3.67 0-1.63 0.61-2.86 1.84-3.67l207.47-192.78c1.63-1.63 3.47-1.84 5.51-0.61l55.08 31.22c7.75 4.48 15.71 4.48 23.87 0l62.42-36.72c2.45-1.63 4.29-1.43 5.51 0.61L555.08 514.69zM574.06 192.17c1.63 0.82 2.45 2.24 2.45 4.28v258.26c0 2.04-1.02 3.47-3.06 4.29 -0.4 0.41-1.02 0.61-1.84 0.61 -1.22 0-2.44-0.61-3.67-1.84L413.1 290.7c-1.22-1.23-1.63-2.45-1.22-3.67 0-1.63 0.61-2.86 1.84-3.67l155.45-91.19C570.39 190.94 572.02 190.94 574.06 192.17zM556.92 53.86c5.71 0 10.4 1.84 14.08 5.51s5.51 8.16 5.51 13.46v58.75c0 2.86-1.43 4.28-4.28 4.28 -2.45 0.41-4.69 1.43-6.73 3.06L291.31 299.88c-0.41 0.41-1.23 0.61-2.45 0.61s-2.04-0.2-2.45-0.61L3.67 138.92C1.22 137.29 0 135.66 0 134.03v-61.2c0-5.3 1.84-9.79 5.51-13.46s8.16-5.51 13.46-5.51H556.92L556.92 53.86z" fill="#010002"/>
						</svg>
						<span class="data"><xsl:value-of select="email"/></span>
					</div>
				</div>
			</xsl:for-each>

		<footer>
			<hr/>
			Icons made by <a href="http://www.flaticon.com/authors/zurb" title="Zurb">Zurb</a>, <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>
		</footer>
		</body>
	</html>
	</xsl:template>
</xsl:stylesheet>