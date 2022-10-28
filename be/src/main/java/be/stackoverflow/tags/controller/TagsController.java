package be.stackoverflow.tags.controller;

import be.stackoverflow.dto.MultiResponseDto;
import be.stackoverflow.dto.SingleResponseDto;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.tags.dto.TagsDto;
import be.stackoverflow.tags.entity.Tags;
import be.stackoverflow.tags.mapper.TagsMapper;
import be.stackoverflow.tags.service.TagsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/tags")
public class TagsController {

    private final TagsService tagsService;
    private final TagsMapper tagsMapper;


    /**
     * @PostConstruct로 미리 넣어둘 예정
     * 되도록이면 스탭데이터를 넣어서 그대로 사용하는게 좋을꺼같다는 생각입니다.
     */

    @PostMapping
    public ResponseEntity postTag(@RequestBody TagsDto.Post request) {

        Tags tags = tagsMapper.tagsPostDtoToTags(request);
        tagsService.createTag(tags);

        return new ResponseEntity<>(
                new SingleResponseDto<>(tagsMapper.tagsToTagsResponseDto(tags)), HttpStatus.CREATED);
    }

    @GetMapping("/{tagId}")
    public ResponseEntity getTag(@PathVariable("tagId") long tagId) {
        Tags tags = tagsService.findTag(tagId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(tagsMapper.tagsToTagsResponseDto(tags)),HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getTags(@Positive @RequestParam int page,
                                  @Positive @RequestParam int size) {

        Page<Tags> pageInfomation = tagsService.findTags(page-1, size);
        List<Tags> allTags = pageInfomation.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto(tagsMapper.tagsToTagsReponses(allTags),pageInfomation),HttpStatus.OK);
    }

}
