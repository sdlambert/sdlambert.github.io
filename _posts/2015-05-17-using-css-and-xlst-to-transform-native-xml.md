---
title: Using CSS and XSLT to Transform Native XML
layout: post
tags:
 - xml
 - css
description: "A quick showcase of XLST and how to use it to transform native XML, based off some work that I did for a school assignment."
#metadata
image_path: "/img/xlst-butterfly.png"
---

![Image of a butterfly, courtest of Magee via Pixabay](/img/xslt-butterfly.png "Butterfly by Magee via Pixabay")

Towards the end of our SQL class we covered the process of converting our query output into XML. We didn't dive too much into the topic itself, but we covered the basics of transforming our output using [XSLT][1], or Extensible Stylesheet Language Transformations. Using our XML output we were able translate our XML into standard HTML tags and utilize CSS to display the information in an organized way. I'll break down what I learned and how you can display your back-end data using XSLT, too.

<!--more-->

*Please note the XML displayed in this demo is best viewed in Firefox.*

##A Quick Overview

For our XSLT project, we'll need three files. The first file is our native XML file, which we'll need to tweak slightly before moving on. The raw XML is just going to have the raw data from our query in XML format, like so:

{% highlight xml %}
<inventory>
    <name>Artwork</name>
    <description>Hand Crafted Artwork</description>
    <maxprice>25.00</maxprice>
</inventory>
<inventory>
    <name>Artwork</name>
    <description>Hand Crafted Artwork</description>
    <maxprice>15.00</maxprice>
</inventory>
...
{% endhighlight %}

We'll need to add a header to our XML file that references our two other files, the XML stylesheet (XSL) and the XML schema (XSD). Our stylesheet file will contain the CSS and HTML code used to display the XML. The XML schema file defines the structure of our XML so the stylesheet can be translated properly. In short, we just need add a few short lines to our code:

{% highlight xml %}
<?xml version="1.0" encoding="ISO-8859-1"?>
<?xml-stylesheet type="text/xsl" href="inventorystyle.xsl"?>
<list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="inventoryschema.xsd">
{% endhighlight %}

The first line simply defines the XML version and character encoding for the file. Our second line defines the type and location of our XML stylesheet. The last line adds a new XML element to the document, a `<list>` element. (We'll need to close this element by appending a closing `</list>` element at the end of our XML.) The list element allows us to parse through the following XML using the provided XML schema.

The XML schema is a simple document tree that defines the structure of our XML. This can be exported directly from SQL, and the resulting output looks like so:

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="inventory">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="name" type="xs:string" />
                <xs:element name="description" type="xs:string" />
                <xs:element name="maxprice" type="xs:decimal" />
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
{% endhighlight %}

Our stylesheet will contain all the HTML elements we'll need to display the data as well as our CSS. For the most part, the [stylesheet file][2] looks mostly like a standard HTML document. There's a few important distinctions, mainly the heading at the top of our file and the XLST elements used to parse the XML.

Our header once again declares the document to be an XSL stylesheet. We then proceed to define our template across the whole document using the `match` attribute:

{% highlight xml %}
<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
{% endhighlight %}

We continue by defining our HTML root and HTML document structure and embedded CSS styles. The interesting part comes where we parse the XML and translate it into HTML elements. This is acheived using a for loop and select statements like so:

{% highlight xml %}
<xsl:for-each select="list/inventory">
        <div class="column"><xsl:value-of select="name"/></div>
        <div class="column"><xsl:value-of select="description"/></div>
        <div class="column-small right">$<xsl:value-of select="maxprice"/></div>
</xsl:for-each>
{% endhighlight %}

Our first statement is a `for-each` loop, which basically says for each node in the XML document tree (starting with the child nodes of the `<list>` and `<inventory>` elements) do the following. The next XML element is a `value-of` statement, which selects the data contained within the specified tags. In this case, we are grabbing the `name`, `description` and `maxprice` elements and displaying the data within each. We do this for each element in our loop until we have parsed all of our XML.

##The Results

Once we have our basic XSLT in place, we can put all three together and see the results:

[Inventory example][3]

As you can see, the style is very straightforward, but the results can be quite different than viewing the same information in raw XML format.

With a bit of additional CSS, we can start to make the data appear even more visually appealing. Making tweaks is as simple as updating the inline CSS within our XML stylesheet file. Here's a second example of XSLT translating customer data into a small cards:

[Customer Data][4]

This demonstration is just a fraction of what you can do with XSLT. The ability to translate basic XML into styled HTML is a powerful way to display data from the back-end to your users on the front-end.

Thanks for reading!

Additional Reading:

* [XSLT on Mozilla Developer Network][5]
* [XSLT Tutorials on IBM developerWorks][6]

*Image courtesy of [magee][7] via [Pixabay][8], used under the Creative Commons License*


[1]: http://en.wikipedia.org/wiki/XSLT
[2]: {{ site.url }}/demo/xslt/inventorystyle.xsl
[3]: {{ site.url }}/demo/xslt/inventorytags.xml
[4]: {{ site.url }}/demo/xslt/customerownertags.xml
[5]: https://developer.mozilla.org/en-US/docs/Web/XSLT
[6]: http://www.ibm.com/developerworks/xml/tutorials/x-introxslt/x-introxslt.html
[7]: https://pixabay.com/en/users/magee-830963/
[8]: https://pixabay.com/en/butterfly-wings-insect-common-crow-686117/




