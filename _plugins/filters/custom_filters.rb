module DavidMn
  module CustomFilters

    def category_link(category)
      category_slug = Jekyll::CategoryIndex.category_slug(category);
      config = @context.registers[:site].config
      dir = config[Jekyll::CategoryIndex::CONFIG_CATEGORY_DIR] || Jekyll::CategoryIndex::DEFAULT_CATEGORY_DIR
      "#{dir}/#{category_slug}/"
    end

  end
end

Liquid::Template.register_filter(DavidMn::CustomFilters)