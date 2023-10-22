package RainbowLike.controller;

import RainbowLike.dto.OrganizationDto;
import RainbowLike.entity.Organization;
import RainbowLike.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/org")
public class OrganizationController {

    private final OrganizationService organizationService;
    @GetMapping
    private Iterable<Organization> getOrganization() {
        return organizationService.findAll();
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Organization> searchEduHist(@PathVariable String option, @PathVariable String value) {
        return organizationService.searchByOptionAndValue(option, value);
    }

    @PostMapping
    public ResponseEntity<Organization> saveOrg(@RequestBody OrganizationDto organizationDto) {
        Organization savedOrg = organizationService.saveOrg(organizationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrg);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrg(@PathVariable Long id) {
        organizationService.deleteOrg(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{orgNum}")
    public ResponseEntity<Organization> updateOrg(@PathVariable Long orgNum, @RequestBody OrganizationDto organizationDto) {
        try {
            Organization updatedOrg = organizationService.updateOrg(orgNum, organizationDto);
            if (updatedOrg != null) {
                return ResponseEntity.ok(updatedOrg);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
