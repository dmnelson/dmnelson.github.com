module DavidMn
  module CustomFilters

    def category_link(category)
      category_slug = Jekyll::CategoryIndex.category_slug(category);
      config = @context.registers[:site].config
      dir = config[Jekyll::CategoryIndex::CONFIG_CATEGORY_DIR] || Jekyll::CategoryIndex::DEFAULT_CATEGORY_DIR
      "#{dir}/#{category_slug}/"
    end

    def tag_links(tags)
      dir = @context.registers[:site].config['tag_dir'] || '/tag'
      tags = tags.sort!.map do |item|
        "<a class='tag' href='#{File.join(dir, item)}/'>#{item}</a>"
      end

      case tags.length
        when 0
          ""
        when 1
          tags[0].to_s
        else
          "#{tags[0...-1].join(', ')}, #{tags[-1]}"
      end
    end

  end
end

Liquid::Template.register_filter(DavidMn::CustomFilters)