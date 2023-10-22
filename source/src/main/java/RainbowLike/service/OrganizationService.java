package RainbowLike.service;

import RainbowLike.dto.OrganizationDto;
import RainbowLike.entity.Organization;
import RainbowLike.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final ModelMapper mapper;

    public Iterable<Organization> findAll() {
        return organizationRepository.findAll();
    }

    public Iterable<Organization> searchByOptionAndValue(String option, String value) {
        Iterable<Organization> result;
        switch (option) {
            case "name":
                result = organizationRepository.findByNameContaining(value);
                break;
            case "addr":
                result = organizationRepository.findByAddrContaining(value);
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
    }

    @Transactional
    public Organization saveOrg(OrganizationDto organizationDto) {
        Organization org = mapper.map(organizationDto, Organization.class);
        return organizationRepository.save(org);
    }

    @Transactional
    public void deleteOrg(Long id) {
        if (!organizationRepository.existsById(id)) {
            throw new RuntimeException("Organization with ID: " + id + " does not exist.");
        }
        organizationRepository.deleteById(id);
    }

    public Organization updateOrg(Long orgNum, OrganizationDto organizationDto) {
        Optional<Organization> existingOrg = organizationRepository.findById(orgNum);
        if (existingOrg.isPresent()) {
            Organization org = existingOrg.get();
            mapper.map(organizationDto, org);
            return organizationRepository.save(org);
        } else {
            return null;
        }
    }

//    @PostConstruct
    public void createDefaultOrganization() {
        List<OrganizationDto> organizationDtos = OrganizationDto.creatDefaultOrg();
        for (OrganizationDto organizationDto : organizationDtos) {
            saveOrg(organizationDto);
        }
    }

}
