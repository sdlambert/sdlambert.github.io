# module Jekyll
#   module IndentMarkup
#     # Idents all lines in content based on level by indent (default 1 tab)
#     # ignoreFirstLine will ignore the first line, as your include tag will likely be indented sufficently
#     def indent(content, level=0, indent="	", ignoreFirstLine=true)
#       indentation = indent * level.to_i;
#       result = []
#       firstLine = ignoreFirstLine

#       content.each_line do |line|
#         if firstLine == true
#           result << line
#           firstLine = false
#         else
#           result << (indentation + line)
#         end
#       end
#       result.join('')
#     end

#     # Idents all lines in content based on level by 1 tab ("	")
#     def indent_tab(content, level=0)
#       indent(content, level, "	");
#     end

#     # Idents all lines in content based on level by 1 space (" ")
#     def indent_space(content, level=0)
#       indent(content, level, " ");
#     end
#   end

# end

# Liquid::Template.register_filter(Jekyll::IndentMarkup)