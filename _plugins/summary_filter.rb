module Jekyll
  module SummaryFilter
    def summarize(input)
      "raaa"
    end
  end
end

Liquid::Template.register_filter(Jekyll::SummaryFilter)